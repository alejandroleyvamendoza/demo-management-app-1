import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export async function GET(req: Request) {

    const roles = await prisma.role.findMany();

    return Response.json({ success: true, data: roles });
}

export async function POST(req: Request) {

    const roles = await prisma.role.createMany({
        data: [
            { name: 'Admin', status: 'ACTIVE' },
            { name: 'Manager', status: 'ACTIVE' },
            { name: 'Employee', status: 'ACTIVE' },
            { name: 'User', status: 'ACTIVE' },
        ],
    });

    return Response.json({ success: true, data: roles });
}