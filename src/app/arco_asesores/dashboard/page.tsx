'use client'

import Datepicker from "../../ui/components/datePicker";
import Search from "../../ui/components/search";
import SideMenu from "app/app/ui/components/sideMenu";
import { useSession } from "next-auth/react";
import { EmployeeTableRow } from "../../ui/components/employeeTableRow";
import { useEffect, useState } from "react";
import { useAuth } from "app/app/context/authContext";


export default function Page() {

    // const { data: session, status } = useSession();
    // const [session, setSession] = useState(null);

    // const { data: session, status } = useSession();
    const [users, setUsers] = useState([]);
    const { status } = useAuth();


    useEffect(() => {
        console.log({ users, status });
        if (status === "authenticated") {
            fetch("/api/user")
                .then((res) => {
                    console.log(':::::::::::::::::::::::::::::::::', res);
                    return res.json();
                })
                .then((data) => {

                    console.log('::::::::::::::::::::::::::::::::: data', data)
                    setUsers(data.data);
                }).catch((error) => console.error("Error fetching users:", error));
        }
    }, [status]);



    if (status === "authenticated") {

        return (
            <SideMenu>
                <div className="relative h-screen">
                    <div className="flow-root h-fit rounded-lg border border-gray-100 py-3 shadow-sm overflow-x-auto m-4 sm:m-6 lg:m-8 p-4 sm:p-6 lg:p-8">

                        {/* Inicia buscador */}
                        {/* 
                        <div className="flex">
                            <Search />
                            <Datepicker />
                        </div>
                        */}

                        {/* Inicia tabla */}

                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">e-mail</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Role</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Opciones</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <EmployeeTableRow key={user.id} user={user}></EmployeeTableRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SideMenu>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <button disabled type="button" className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                    <svg aria-hidden="true" role="output" className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                    Loading...
                </button>
            </div>
        )
    }
}