'use client';

import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { useAppContext } from "app/app/context/authContext";
import { EmployeesTable } from "app/app/ui/components/EmployeesTable";
import SideMenu from "app/app/ui/components/sideMenu";

export default function Page() {
    const [shouldAssignUser, setShouldAssignUser] = useState(false);
    const { data: session, status } = useSession();
    const { selectedUserForUpdate, setSelectedUserForUpdate, } = useAppContext();

    useEffect(() => {
        if (status === "authenticated" && session?.data?.user) {
            localStorage.setItem("user", JSON.stringify(session.data.user));
            fetchUsers(`/api/user/${session.data.selectedUser}`);
        }
    }, [status, session]);

    const fetchUsers = useCallback(async (url: string) => {
        try {
            const response = await fetch(url, { method: 'GET' });
            const result = await response.json();
            setSelectedUserForUpdate(result.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }, [selectedUserForUpdate]);

    const toggleAssignUsers = () => {
        fetchUsers('/api/user');
        setShouldAssignUser(prev => !prev);
    };

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <button disabled className="flex items-center space-x-3 px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg shadow-md">
                    <svg className="w-5 h-5 text-gray-400 animate-spin" viewBox="0 0 100 101" fill="none">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                    </svg>
                    <span>Cargando...</span>
                </button>
            </div>
        );
    }

    if (status === "authenticated") {
        return (
            <SideMenu>
                <div className="relative flex justify-center h-screen p-6">
                    {users?.length > 0 || shouldAssignUser ? (
                        <EmployeesTable users={users} showDropDownOptions={true} showAssignButtons={false} />
                    ) : (
                        <div className="flex flex-col items-center">
                            <p className="text-gray-700 text-lg">El usuario no tiene asesores asignados</p>
                            <button
                                onClick={toggleAssignUsers}
                                className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg px-6 py-2 transition duration-300"
                            >
                                Mostrar empleados
                            </button>
                        </div>
                    )}
                </div>
            </SideMenu>
        );
    }

    return null;
}
