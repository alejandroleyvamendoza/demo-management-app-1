import { TableRowProps } from "app/app/lib/interfaces/TableRowProps";
import EmployeeOtionsDropDown from "./employeeOtionsDropDown";



export const ClientTableRow: React.FC<TableRowProps> = ({ client }) => {

    console.log('ClientTableRow', client)

    return (
        <tr className="relative">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">

                <input id="default-checkbox" type="checkbox" value=""
                className=
                "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                // "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 />
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"></label>

            </td>
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{client.id}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${client.name}`}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${client.lastname}`}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client.email}</td>
        </tr>
    );
}

