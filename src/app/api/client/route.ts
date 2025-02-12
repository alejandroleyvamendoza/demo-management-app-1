import { PrismaClient, Role } from "@prisma/client";

let prisma = new PrismaClient();


export async function GET(req: Request) {
  const users = await prisma.client.findMany();

  return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}
