// import { IClient } from "app/app/module/role/repository/interfaces";
// import { useState } from "react";

// export const ClientsTable = ({ user, clients }) => {

//     const [loading, setLoading] = useState(false);
//     const [selectedClients, setSelectedClients] = useState<IClient[]>([]);
//     const [selectAll, setSelectAll] = useState(false);

//     const handleSelectAllChange = () => {
//         console.log('selectAll', selectAll);
//         setSelectAll(!selectAll);
//         setSelectedClients(selectAll ? [] : clients.map((client: IClient) => client));
//     };


//     const assignClientsToEmployee = () => {

//         console.log('====================== ClientCard selectedClients ======================', { selectedClients, user });

//         if (selectedClients) {

//             fetch("/api/client/add_to_employee", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ data: { clients: selectedClients, user }, }),
//             }).then((res) => {
//                 if (!res.ok) throw new Error("Error al relacionar clientes con empleado");
//                 return res.json();
//             }).catch((error) => {
//                 console.error("Error fetching users:", error);
//                 setLoading(false);
//             });
//         }

//     };

//     const handleCheckboxChange = (currentClient) => {
//         setSelectedClients((prevSelected) => {


//             if (prevSelected) {

//                 console.log('ClientCard prevSelected', prevSelected);

//                 if (prevSelected.some((client) => client.id === currentClient.id)) {

//                     const filter = prevSelected.filter((c) => {

//                         console.log('c.id !== currentClient.id', { c, currentClient })

//                         return c.id !== currentClient.id;
//                     });

//                     console.log('FILTER', filter);
//                     return filter;
//                 } else {
//                     return [...prevSelected, currentClient]
//                 }
//             }
//         });

//         console.log('selectedClients.includes(client.id)', selectedClients.includes(currentClient), { selectedClients });

//     };

//     return (
//         <section>
//             <div className='overflow-y-scroll h-2/3'>
//                 <table className="min-w-full divide-y-2 divide-gray-200  text-sm">
//                     <thead className="sticky top-0 bg-white z-10 ltr:text-left rtl:text-right">
//                         <tr className=''>
//                             <th className="bg-whitespace-nowrap px-4 py-2 font-medium text-gray-900">Asignar</th>
//                             <th className="bg-whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
//                             <th className="bg-whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nombre</th>
//                             <th className="bg-whitespace-nowrap px-4 py-2 font-medium text-gray-900">Apellido</th>
//                             <th className="bg-whitespace-nowrap px-4 py-2 font-medium text-gray-900">e-mail</th>
//                             <th className="bg-whitespace-nowrap px-4 py-2 font-medium text-gray-900">Asignado a Asesor</th>
//                         </tr>
//                     </thead>

//                     <tbody className="divide-y divide-gray-200">
//                         {clients.map((client: IClient) => {

//                             // console.log('client', client);

//                             return (
//                                 // <ClientTableRow key={client.id} client={client}></ClientTableRow>
//                                 <tr key={client.id} className="relative">
//                                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">

//                                         <input
//                                             className=
//                                             "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
//                                             // "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                                             type="checkbox"
//                                             checked={selectedClients.includes(client)}
//                                             value=""
//                                             id={`client-${client.id}`}
//                                             onChange={() => handleCheckboxChange(client)}
//                                         />
//                                         <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>

//                                     </td>
//                                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{client.id}</td>
//                                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${client.name}`}</td>
//                                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${client.lastname}`}</td>
//                                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client.email}</td>
//                                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client?.manager?.name}</td>
//                                 </tr>

//                             )
//                         }
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             <div
//                 className='flex justify-end my-4'>
//                 <button onClick={() => handleSelectAllChange()} type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Seleccionar Todos</button>
//                 <button onClick={() => assignClientsToEmployee()} type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Crear Asignación</button>
//             </div>
//         </section>
//     )
// }




import { IClient } from "app/app/module/role/repository/interfaces";
import { useState } from "react";

export const ClientsTable = ({ user, clients }: { user: any; clients: IClient[] }) => {
  const [loading, setLoading] = useState(false);
  const [selectedClients, setSelectedClients] = useState<IClient[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedClients(newSelectAll ? [...clients] : []);
  };

  const assignClientsToEmployee = async () => {
    console.log("Asignando clientes:", { selectedClients, user });

    if (selectedClients.length === 0) return;

    try {
      const response = await fetch("/api/client/add_to_employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { clients: selectedClients, user } }),
      });

      if (!response.ok) throw new Error("Error al asignar clientes");
      console.log("Asignación exitosa");
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleCheckboxChange = (currentClient: IClient) => {
    setSelectedClients((prevSelected) =>
      prevSelected.some((client) => client.id === currentClient.id)
        ? prevSelected.filter((c) => c.id !== currentClient.id)
        : [...prevSelected, currentClient]
    );
  };

  return (
    <section className="w-full max-w-screen-xl mx-auto">
      <div className="overflow-auto max-h-[70vh]">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="px-4 py-2 border">Asignar</th>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Apellido</th>
              <th className="px-4 py-2 border">E-mail</th>
              <th className="px-4 py-2 border">Asignado a Asesor</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">
                  <input
                    type="checkbox"
                    checked={selectedClients.some((c) => c.id === client.id)}
                    onChange={() => handleCheckboxChange(client)}
                    className="w-4 h-4"
                    aria-label={`Seleccionar ${client.name} ${client.lastname}`}
                  />
                </td>
                <td className="px-4 py-2 border text-center">{client.id}</td>
                <td className="px-4 py-2 border">{client.name}</td>
                <td className="px-4 py-2 border">{client.lastname}</td>
                <td className="px-4 py-2 border">{client.email}</td>
                <td className="px-4 py-2 border">{client?.manager?.name || "No asignado"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleSelectAllChange}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {selectAll ? "Deseleccionar Todos" : "Seleccionar Todos"}
        </button>
        <button
          onClick={assignClientsToEmployee}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          disabled={loading || selectedClients.length === 0}
        >
          {loading ? "Asignando..." : "Crear Asignación"}
        </button>
      </div>
    </section>
  );
};
