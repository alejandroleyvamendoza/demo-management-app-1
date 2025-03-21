import { IUser } from "app/app/module/role/repository/interfaces";
import { deleteUser, getUsers } from "app/app/module/user/repository/userRepository";
import { NextRequest } from "next/server";

// export async function GET() {
//   const users = await getUsers();
//   return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });
// }

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const managerId = searchParams.get('manager');
  let users;

  users = await getUsers(parseInt(managerId));
  return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });

}

export async function DELETE(req: Request) {
  const body = await req.json();
  console.log('req.body', req.body)
  const user: IUser = body.data.user;

  let result = await deleteUser(user);

  return Response.json({ data: { user: result }, message: 'SUCCESS', status: 'OK', statusCode: 200 });
}