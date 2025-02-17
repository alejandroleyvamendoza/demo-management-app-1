import { createUser } from "app/app/module/user/repository/userRepository";

export async function POST(req: Request) {
    try {
      const user = createUser(req);
      return Response.json({ success: true, user });
    } catch(error) {
      console.error('error', error);
    }
  }