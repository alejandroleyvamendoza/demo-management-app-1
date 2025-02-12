import React, { useEffect, useState } from 'react'
import { useAuth } from 'app/app/context/authContext';

export const ClientCard = ({ toggleVisibility, user }: any) => {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { status } = useAuth();
    const [selectedClients, setSelectedClients] = useState([]);



    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/client")
                .then((res) => {
                    if (!res.ok) throw new Error("Error al obtener los clientes");
                    return res.json();
                })
                .then((data) => {
                    setClients(data.data);
                }).catch((error) => {
                    console.error("Error fetching users:", error);

                    setLoading(false);
                });
        }
    }, []);

    const handleCheckboxChange = (currentClient) => {

        console.log('selectedClients', selectedClients)
        setSelectedClients((prevSelected) => {
            if (prevSelected) {

                if (prevSelected.some((client) => client.id === currentClient.id)) {
                    return prevSelected.filter((c) => c.id !== currentClient.id)
                } else {
                    return [...prevSelected, currentClient]
                }
            }
        }
        )
    };

    const assignClientsToEmployee = async (userId: number, clientIds: number[]) => {
        try {
            const response = await fetch("/api/client/assign", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({clientes: selectedClients, }),
            });

            if (!response.ok) throw new Error("Error al asignar clientes");

            const data = await response.json();
            console.log("Clientes asignados correctamente:", data);
        } catch (error) {
            console.error("Error al asignar clientes:", error);
        }
    };

    const relationClientToEmployee = () => {

        if (status === "authenticated") {
            fetch("/api/client")
                .then((res) => {
                    if (!res.ok) throw new Error("Error al obtener los clientes");
                    return res.json();
                })
                .then((data) => {
                    setClients(data.data);
                }).catch((error) => {
                    console.error("Error fetching users:", error);

                    setLoading(false);
                });
        }

    }

    console.log('============================ selectedClients', selectedClients)

    return (
        <div
            className='fixed z-20 inset-0'>

            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div
                // className="absolute inset-0 h-32 w-32 bg-white overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                className={`fixed h-1/4 w-fit justify-self-center self-center inset-0 z-10 overflow-y-auto bg-white overflow-hidden rounded-lg border border-gray-100 py-3 shadow-sm m-4 sm:m-6 lg:m-8 p-4 sm:p-6 lg:p-8`}
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

                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Asignar</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Apellido</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">e-mail</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {clients.map((client) => (
                            // <ClientTableRow key={client.id} client={client}></ClientTableRow>
                            <tr key={client.id} className="relative">
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">

                                    <input
                                        className=
                                        "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                        // "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        type="checkbox"
                                        value=""
                                        id={`client-${client.id}`}
                                        onChange={() => handleCheckboxChange(client)}
                                    />
                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>

                                </td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{client.id}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${client.name}`}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${client.lastname}`}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client.email}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>

                <div
                    className='flex justify-end my-4'>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear Asignación</button>
                </div>


            </div>
        </div>
    )
}
