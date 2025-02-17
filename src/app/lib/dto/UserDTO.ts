import { Role } from "@prisma/client";

export interface IUserDTO {
    id: number;
    name: string;
    lastname?: string;
    password?: null | string;
    email: string;
    wa_id?: string;
    role?: Role,
    roleId?: number;
    managerId?: null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: null;
    updatedBy: null;
}

export class UserDTO implements IUserDTO {
    id: number;
    name: string;
    lastname?: string;
    email: string;
    wa_id?: string;
    roleId?: number;
    managerId?: null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: null;
    updatedBy: null;


    constructor(
        id: number,
        name: string,
        lastname: string,
        email: string,
        wa_id: string,
        roleId: number,
        managerId: null,
        status: string,
        createdAt: Date,
        updatedAt: Date,
        createdBy: null,
        updatedBy: null
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.wa_id = wa_id;
        this.roleId = roleId;
        this.managerId = managerId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }
}