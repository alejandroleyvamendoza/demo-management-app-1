import { PrismaClient, Role } from "@prisma/client";
import bcrypt from 'bcryptjs';

let prisma = new PrismaClient();

async function getRole(prisma: PrismaClient): Promise<Role | null> {
  try {
    const role = await prisma.role.findUnique({
      where: {
        name: 'USER',
      },
    })


    return role;

  } catch (error) {
    console.error('Failed to fetch role:', error);
    throw new Error('Failed to fetch role.');
  }
}


export async function GET(req: Request) {
  const users = await prisma.user.findMany({ omit: { password: true }});

  return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(body.data.password, salt);
  const role = await getRole(prisma);

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

  return Response.json({ success: true, user });
}