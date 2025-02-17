import { getUsers } from "app/app/module/user/repository/userRepository";

export async function GET() {
  const users = await getUsers();
  return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}