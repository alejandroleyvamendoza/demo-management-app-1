import React, { useEffect, useState } from 'react'
import { TableRow } from './employeeTableRow'
import { ClientTableRow } from './clientTableRow';

export const EmployeeCard = ({ toggleVisibility, user }: any) => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const fetchClients = async () => {
    //     setLoading(true);
    //     try {
    //         if (status === "authenticated") {

    //             const response = await fetch('/api/client');
    //             if (!response.ok) throw new Error("Error al obtener los clientes");
    //             const data = await response.json();
    //             setClients(data);
    //         }
    //     } catch (err) {
    //         setError(err.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        // if (status === "authenticated") {
        fetch("/api/client")
            .then((res) => {
                console.log(':::::::::::::::::::::::::::::::::', res);
                if (!res.ok) throw new Error("Error al obtener los clientes");
                return res.json();
            })
            .then((data) => {
                console.log('::::::::::::::::::::::::::::::::: data', data)
                setClients(data.data);
            }).catch((error) => {
                console.error("Error fetching users:", error);

                setLoading(false);


            });
        // }
    }, []);

    return (
        <div
            className='fixed z-20 inset-0'>

            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div
                // className="absolute inset-0 h-32 w-32 bg-white overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                className={`fixed h-3/4 w-fit justify-self-center self-center inset-0 z-10 overflow-y-auto bg-white overflow-hidden rounded-lg border border-gray-100 py-3 shadow-sm m-4 sm:m-6 lg:m-8 p-4 sm:p-6 lg:p-8`}
            >
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


                {/* 
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span> 
                */}

                {/* <div className="sm:flex sm:justify-between sm:gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                            Building a SaaS product as a software developer
                        </h3>

                        <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                    </div>

                    <div className="hidden sm:block sm:shrink-0">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                            className="size-16 rounded-lg object-cover shadow-sm"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-pretty text-sm text-gray-500">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum provident a, ipsa
                        maiores deleniti consectetur nobis et eaque.
                    </p>
                </div>

                <dl className="mt-6 flex gap-4 sm:gap-6">
                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Published</dt>
                        <dd className="text-xs text-gray-500">31st June, 2021</dd>
                    </div>

                    <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">Reading time</dt>
                        <dd className="text-xs text-gray-500">3 minute</dd>
                    </div>
                </dl> */}

                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">e-mail</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {clients.map((client) => (
                            <ClientTableRow key={client.id} client={client}></ClientTableRow>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
