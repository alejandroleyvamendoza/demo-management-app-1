import { prisma } from "../../database";
import bcrypt from 'bcryptjs';
import { getUserRole } from "../../role/repository/roleRepository";
import { IUserDTO } from "app/app/lib/dto/UserDTO";
import { User } from "@prisma/client";
import { NextRequest } from "next/server";
import { IUser } from "../../role/repository/interfaces";

export async function getUsers(managerId: number) {
    let users;

    if (managerId) {
        users = await prisma.user.findMany({
            where: { managerId: managerId, id: { not: managerId } }, include: { role: true, manager: true }
        });
    } else {
        users = await prisma.user.findMany({ include: { role: true, manager: true } });
    }


    return users;
}

export async function createUser(req: Request) {
    const body = await req.json();
    console.log('::::: body', body)
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(body.password, salt);
    const role = await getUserRole('User');

    console.log('body', body);


    const user = await prisma.user.create({
        data: {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            wa_id: body.wa_id.slice(-10),
            role: { connect: { id: role?.id } },
            status: 'ACTIVE',
            profile: {
                create: {
                    password: hash,
                    username: body.name,
                }
            }
        }
    });

    console.log(',,,,................,.,.,...', user);

    return user;
}

export async function deleteUser(bodyUser: IUser) {

    console.log(',,,,................,.,.,...', bodyUser);

    const user = await prisma.user.update({
        where: {
            id: bodyUser.id
        },
        data: {
            status: 'DELETED',
        }
    });

    return user;
}