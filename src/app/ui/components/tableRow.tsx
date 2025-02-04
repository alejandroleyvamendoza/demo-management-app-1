import { TableRowProps } from "app/app/lib/interfaces/TableRowProps";
import DropDown from "./dropDown";



export const TableRow: React.FC<TableRowProps> = ({ user }) => {


    return (
        <tr className="relative">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{user.id}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{`${user.name} ${user.lastname}`}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.email}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{user.roleId}</td>
            <td className="whitespace-nowrap px-4 py-2">
                <DropDown/>
            </td>
        </tr>
    );
}

