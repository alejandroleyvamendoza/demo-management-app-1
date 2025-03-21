import { PrismaClient, Role } from "@prisma/client";
import { IClient } from "app/app/module/role/repository/interfaces";

let prisma = new PrismaClient();

export async function GET(req: Request) {

  console.log('====================== /api/client ======================', req);
  const users = await prisma.client.findMany({
    include: {
      manager: {
        omit: {
          createdAt: true,
          createdBy: true,
          roleId: true,
          status: true,
          updatedAt: true,
          updatedBy: true,
          wa_id: true,
        }
      }
    }
  });
  return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}


export async function POST(req: Request) {
  const bodyClient: IClient = await req.json();
  const clientId: number = bodyClient.id;
  const name: string = bodyClient.name;
  const waId: string = bodyClient.wa_id;

  console.log('CLIENT REQ', bodyClient);

  const client = await prisma.client.upsert({
    where: {
      id: clientId
    },
    update: {
      name: bodyClient.name,
      lastname: bodyClient.lastname,
      email: bodyClient.email,
      wa_id: bodyClient.wa_id,
      status: bodyClient.status,
      updatedAt: bodyClient.updatedAt,
      updatedBy: bodyClient.updatedBy,
    },
    create: {
      name: name,
      wa_id: waId,
    },
  });

  return Response.json({ data: client, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}

export async function DELETE(req: Request) {
  const bodyClient: IClient = await req.json();
  const clientId: number = bodyClient.id;

  console.log('CLIENT REQ', bodyClient);

  const client = await prisma.client.update({
    where: {
      id: clientId
    },
    data: {
      status: 'DELETED',
    }
  });

  return Response.json({ data: client, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}


