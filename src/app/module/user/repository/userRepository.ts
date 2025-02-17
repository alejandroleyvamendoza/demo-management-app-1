import { prisma } from "../../database";
import bcrypt from 'bcryptjs';
import { getUserRole } from "../../role/repository/roleRepository";
import { IUserDTO } from "app/app/lib/dto/UserDTO";

export async function getUsers() {
    const users = await prisma.user.findMany({ omit: { password: true }, include: { role: true } });

    return users;
}


export async function getUsersByManagerId(managerId: number) {
    const users = await prisma.user.findMany({
        where: { managerId: managerId }, omit: { password: true }, include: { role: true }
    });
    return users;
}


export async function createUser(req: Request) {
    const body = await req.json();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(body.data.password, salt);
    const role = await getUserRole('User');

    const data: any = {
        name: body.data.name,
        lastname: body.data.lastname,
        password: hash,
        email: body.data.email,
        wa_id: body.data.wa_id.slice(-10),
        role: { connect: { id: role?.id } },
        status: 'ACTIVE',
    };

    const user = await prisma.user.create({
        data
    });

    return user;
}

