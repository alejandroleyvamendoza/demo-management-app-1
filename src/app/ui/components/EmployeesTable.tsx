import { useState } from "react";
import EmployeeOtionsDropDown from "./employeeOtionsDropDown";
import { IUser } from "app/app/module/role/repository/interfaces";

export const EmployeesTable = ({ users, showButtonOptions }) => {

    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);


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

    return (
        <div className="flow-root h-fit rounded-lg border border-gray-100 py-3 shadow-sm overflow-x-auto m-4 sm:m-6 lg:m-8 p-4 sm:p-6 lg:p-8">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
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
                                {showButtonOptions && <EmployeeOtionsDropDown users={users} user={user} index={index} />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
