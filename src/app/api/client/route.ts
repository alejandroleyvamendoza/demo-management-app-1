import { PrismaClient, Role } from "@prisma/client";

let prisma = new PrismaClient();

export async function GET(req: Request) {

  console.log('====================== /api/client ======================', req);
  const users = await prisma.client.findMany({
    include: {
      manager: {
        omit: {
          password: true,
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
