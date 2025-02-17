import { getUsersByManagerId } from "app/app/module/user/repository/userRepository";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const managerId = searchParams.get('manager');
  let users;

  if (managerId) {
    users = await getUsersByManagerId(parseInt(managerId));
    return Response.json({ data: users, message: 'SUCCESS', status: 'OK', statusCode: 200 });
  } else {
    console.log("Param doesn't exist");
    return Response.json({ data: null, message: "Param doesn't exist" });

  }
}