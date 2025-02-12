import { TableRowProps } from "app/app/lib/interfaces/TableRowProps";
import EmployeeOtionsDropDown from "./employeeOtionsDropDown";



export const EmployeeTableRow: React.FC<TableRowProps> = ({ user }) => {

    return (
        <tr className="relative">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${user.name} ${user.lastname}`}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.roleId}</td>
            <td className="whitespace-nowrap px-4 py-2">
                <EmployeeOtionsDropDown/>
            </td>
        </tr>
    );
}

