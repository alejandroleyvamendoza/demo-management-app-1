import { IUserDTO } from "../dto/UserDTO";

export interface DropDownProps {
    user: IUserDTO;
    isOpen: boolean;
    setOpenDropdownId: (id: number | null) => void;
  }