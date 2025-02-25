import { useState } from "react";
import EmployeeOtionsDropDown from "./employeeOtionsDropDown";
import { IUser } from "app/app/module/role/repository/interfaces";
import { useAppContext } from "app/app/context/authContext";

export const EmployeesTable = ({ users, showDropDownOptions, showAssignButtons }) => {

    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [selectAll, setSelectAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const { session } = useAppContext();


    const handleSelectAllChange = () => {
        console.log('selectAll', selectAll);
        setSelectAll(!selectAll);
        setSelectedUsers(selectAll ? [] : users?.map((user: IUser) => user));
    }; 

    const assignEmployeeToManager = () => {

        console.log('====================== EmployeeCard selectedUsers ======================', { selectedUsers, users, user: session.data.data.user });

        if (selectedUsers) {

            fetch("/api/user/add_to_manager", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data: { users: selectedUsers, user: session.data.data.user }, }),
            }).then((res) => {
                if (!res.ok) throw new Error("Error al relacionar Empleado con manager");
                return res.json();
            }).catch((error) => {
                console.error("Error fetching users:", error);
                setLoading(false);
            });
        }

    };



    const handleCheckbox = (currentUser) => {
        setSelectedUsers((prevSelected) => {

            if (prevSelected) {

                if (prevSelected.some((user) => user.id === currentUser.id)) {

                    const filter = prevSelected.filter((c) => {

                        console.log('c.id !== currentUser.id', { c, currentUser })

                        return c.id !== currentUser.id;
                    });

                    console.log('FILTER', filter);
                    return filter;
                } else {
                    return [...prevSelected, currentUser]
                }
            }
        });

        console.log('selectedUsers.includes(user.id)', selectedUsers.includes(currentUser), { selectedUsers });

    };

    if (users) {
        return (
            <section>
                <div className='overflow-y-scroll h-2/3'>
                    <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
                        <thead className="sticky top-0 bg-white z-10 ltr:text-left rtl:text-right">
                            <tr>
                                <th className="bg-whitespace-nowrap px-4 py-2 font-medium text-gray-900">Asignar</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">e-mail</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Manager</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Opciones</th>
                                <th className="px-4 py-2"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {users.map((user: IUser, index: number) => (
                                <tr key={user.id} className="relative">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">

                                        <input
                                            className=
                                            "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                            // "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            type="checkbox"
                                            checked={selectedUsers.includes(user)}
                                            value=""
                                            id={`user-${user.id}`}
                                            onChange={() => handleCheckbox(user)}
                                        />
                                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>

                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${user.name} ${user.lastname}`}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user?.role?.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user?.manager?.name}</td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        {showDropDownOptions && <EmployeeOtionsDropDown users={users} user={user} index={index} />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    showAssignButtons && (
                        <div
                            className='flex justify-end my-4'>
                            <button onClick={() => handleSelectAllChange()} type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Seleccionar Todos</button>
                            <button onClick={() => assignEmployeeToManager()} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear Asignación</button>
                        </div>
                    )
                }
            </section >
        )
    } else {
        <p>No existen usuarios por mostrar</p>
    }
}
