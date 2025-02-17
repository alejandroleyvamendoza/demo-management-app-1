import { prisma } from "app/app/module/database";
import { getUserRole } from "app/app/module/role/repository/roleRepository";
import { NextRequest } from "next/server";

export async function GET(req: Request) {
    console.log('Request', {req});
    const roles = await getUserRole('User');
    return Response.json({ success: true, data: roles });
}

export async function POST(req: Request) {

    const roles = await prisma.role.createMany({
        data: [
            { name: 'Admin', status: 'ACTIVE' },
            { name: 'Manager', status: 'ACTIVE' },
            { name: 'Employee', status: 'ACTIVE' },
            { name: 'Client', status: 'ACTIVE' },

        ],
    });

    return Response.json({ success: true, data: roles });
}