export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    PENDING = "PENDING",
    DELETED = "DELETED"
}

export interface IClient {
    id: number;
    name: string;
    lastname?: string;
    email?: string;
    wa_id: string;
    manager?: IUser;
    managerId?: number;
    status: Status;
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    usersToClients: IUserClient[];
    usersToClients_history: IUserClientHistory[];
}

export interface IProfile {
    id: number;
    username: string;
    password?: string;
    user?: IUser;
}

export interface IUser {
    id: number;
    name: string;
    lastname?: string;
    email: string;
    wa_id?: string;
    role?: IRole;
    roleId?: number;
    profile?: IProfile;
    profileId?: number;
    clients: IClient[];
    manager?: IUser;
    managerId?: number;
    employees: IUser[];
    managedBy: IUserRelationship[];
    manages: IUserRelationship[];
    status: Status;
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
    clientsToEmployee: IUserClient[];
    clientsToEmployee_history: IUserClientHistory[];
}

export interface IUserRelationship {
    id: number;
    employee: IUser;
    employeeId: number;
    manager: IUser;
    managerId: number;
}

export interface IPermission {
    id: number;
    name: string;
    description: string;
    status: Status;
    rolePermissions: IRolePermission[];
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface IRole {
    id: number;
    name: string;
    users: IUser[];
    permissions: IRolePermission[];
    status: Status;
    createdAt: Date;
    updatedAt?: Date;
    createdBy?: number;
    updatedBy?: number;
}

export interface IRolePermission {
    id: number;
    role: IRole;
    roleId: number;
    permission: IPermission;
    permissionId: number;
}

export interface IUserClientHistory {
    id: number;
    user: IUser;
    userId: number;
    client: IClient;
    clientId: number;
    createdAt: Date;
}

export interface IUserClient {
    id: number;
    user: IUser;
    userId: number;
    client: IClient;
    clientId: number;
    createdAt?: Date;
}
