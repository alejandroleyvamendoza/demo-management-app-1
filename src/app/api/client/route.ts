import { PrismaClient, Role } from "@prisma/client";

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
  const body = await req.json();
  const name: string = body.name;
  const waId: string = body.wa_id;

  console.log('CLIENT REQ', body);

  const client = await prisma.client.create({
    data: {
      name: name,
      wa_id: waId,
    },
  });

  return Response.json({ data: client, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}
