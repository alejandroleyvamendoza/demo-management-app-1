import { getUsers } from "app/app/module/user/repository/userRepository";
import { NextRequest } from "next/server";

// export async function GET() {
//   const users = await getUsers();
//   return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });
// }

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const managerId = searchParams.get('manager');
  let users;

  console.log('?????????????????????????????????????????????? managerId', managerId)
  users = await getUsers(parseInt(managerId));
  return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });

}