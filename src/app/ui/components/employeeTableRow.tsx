import { TableRowProps } from "app/app/lib/interfaces/TableRowProps";
import EmployeeOtionsDropDown from "./employeeOtionsDropDown";


export const EmployeeTableRow = ({ user, index }) => {

    return (
        <tr className="relative">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${user.name} ${user.lastname}`}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user?.role?.name}</td>
            <td className="whitespace-nowrap px-4 py-2">
                <EmployeeOtionsDropDown user={user} index={index} />
            </td>
        </tr>
    );
}

