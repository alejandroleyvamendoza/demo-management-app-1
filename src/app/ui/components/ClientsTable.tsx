import { IClient } from "app/app/module/role/repository/interfaces";
import { useEffect, useState } from "react";
import { Message } from './message';

export const ClientsTable = ({ user, clients }: { user: any; clients: IClient[] }) => {
  const [loading, setLoading] = useState(false);
  const [selectedClients, setSelectedClients] = useState<IClient[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {

  //   if (showMessage) {
  //     setShowMessage(true);
  //     const timer = setTimeout(() => setShowMessage(false), 5000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [showMessage]);

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
      setShowMessage(true);
      setLoading(false);
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
      {
        showMessage && <Message message={"Se realizó la asignación con exito"} type='SUCCESS' key={1} />
      }
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

          <tbody className="divide-y divide-gray-200">
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
