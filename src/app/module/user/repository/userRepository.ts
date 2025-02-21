import { prisma } from "../../database";
import bcrypt from 'bcryptjs';
import { getUserRole } from "../../role/repository/roleRepository";
import { IUserDTO } from "app/app/lib/dto/UserDTO";
import { User } from "@prisma/client";

export async function getUsers(managerId: number) {
    let users;
    console.log('¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿¿ managerId', managerId)

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
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(body.data.password, salt);
    const role = await getUserRole('User');

    console.log('body', body);


    const user = await prisma.user.create({
        data: {
            name: body.data.name,
            lastname: body.data.lastname,
            email: body.data.email,
            wa_id: body.data.wa_id.slice(-10),
            role: { connect: { id: role?.id } },
            status: 'ACTIVE',
            profile: {
                create: {
                    password: hash,
                    username: body.data.name,
                }
            }
        }
    });

    console.log(',,,,................,.,.,...', user);

    return user;
}

