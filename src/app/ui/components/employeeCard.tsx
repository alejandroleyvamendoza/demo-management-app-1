import React, { useEffect, useState } from 'react'
import { TableRow } from './employeeTableRow'
import { ClientTableRow } from './clientTableRow';
import { EmployeesTable } from './EmployeesTable';

export const EmployeeCard = ({ toggleVisibility, user, users }: any) => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <div
            className='fixed z-20 inset-0'>

            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <section className=''>
                <div
                    // className="absolute inset-0 h-32 w-32 bg-white overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                    className={`fixed h-2/3 w-fit justify-self-center self-center inset-0 z-10  bg-white  rounded-lg border border-gray-100 py-3 shadow-sm m-4 sm:m-6 lg:m-8 p-4 sm:p-6 lg:p-8`}
                >
                    <h2>Asignar Empleado al Manager - {user.name} {user.lastname}</h2>
                    {/* Close Modal */}
                    <div
                        role="button"
                        onClick={() => toggleVisibility()}
                        className='flex justify-end my-4'>
                        <span
                            className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700"
                        >
                            <p className="whitespace-nowrap text-sm">Cerrar</p>

                            <button
                                onClick={() => toggleVisibility()}
                                className="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:bg-purple-300"
                            >
                                <span className="sr-only">Remove badge</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-3"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </span>
                    </div>
                    {users !== null && (<EmployeesTable users={users} showDropDownOptions={false} showAssignButtons={true} />)}
                </div>
            </section>
        </div>
    )
}
