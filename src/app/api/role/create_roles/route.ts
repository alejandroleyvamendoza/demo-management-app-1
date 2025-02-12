import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export async function GET() {

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