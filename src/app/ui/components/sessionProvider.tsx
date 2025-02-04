// components/SessionProvider.tsx
"use client";

import { SessionProvider as Provider } from "next-auth/react";
import { usePathname } from "next/navigation";


export default function SessionProvider({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login" || pathname === '/';

    return isLoginPage ? children : <Provider>{children}</Provider>
}

