import { TableRowProps } from "app/app/lib/interfaces/TableRowProps";
import { useEffect, useState } from "react";
import EmployeeOtionsDropDown from "./employeeOtionsDropDown";


export const UserTableRow = ({ user, index }) => {
    const [selectedUser, setSelectedUser] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);


    const handleCheckbox = (currentUser) => {
        setSelectedUsers((prevSelected) => {

            if (prevSelected) {

                if (prevSelected.some((user) => user.id === currentUser.id)) {

                    const filter = prevSelected.filter((c) => {

                        console.log('c.id !== currentUser.id', { c, currentUser })

                        return c.id !== currentUser.id;
                    });

                    console.log('FILTER', filter);
                    return filter;
                } else {
                    return [...prevSelected, currentUser]
                }
            }
        });

        console.log('selectedUsers.includes(user.id)', selectedUsers.includes(currentUser), { selectedUsers });

    };

    const handleSelectAllChange = () => {
        console.log('selectAll', selectAll);
        setSelectAll(!selectAll);
        setSelectedUsers(selectAll ? [] : users.map((user) => user));
    };


    return (
        <></>
    );
}

