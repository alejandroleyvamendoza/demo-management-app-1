import { getSession } from "next-auth/react";
import { auth } from "../../../../../auth";

export const GET = auth((req) => {

    console.log('====================== api/auth/session/route.ts GET ======================', req.auth);

    if (req?.auth) {
        return Response.json({ data: req.auth })
    }
    return Response.json({ data: null, message: "Not authenticated" }, { status: 401 })
})
