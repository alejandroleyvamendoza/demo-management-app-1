import { getSession } from "next-auth/react";
import { auth } from "../../../../../auth";

export const GET = auth((req) => {

    console.log('req', req.auth)
    if (req?.auth) {
        return Response.json({ data: req.auth })
    }
    return Response.json({ message: "Not authenticated" }, { status: 401 })
})
