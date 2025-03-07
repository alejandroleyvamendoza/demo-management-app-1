import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { IAuthJWT, IUser } from './src/app/module/role/repository/interfaces';

async function getUser(email: string): Promise<IUser | null> {
    const prisma = new PrismaClient();
    try {
        const user: IUser = await prisma.user.findUnique({
            where: {
                email,
            },
            include: { role: true, profile: true }
        }) as IUser;

        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const { auth, signIn, signOut } = NextAuth(
    {
        callbacks: {
            async jwt({ token, user }: IAuthJWT) {

                console.log('====================== auth.ts jwt ======================', user);

                if (user) {
                    token.id = user.id;
                    token.email = user.email;
                    token.name = user.name;
                    token.role = user?.role?.name
                }

                console.log(' ::::: user :::::', { user, token });
                return token;
            },
            async session({ session, token }) {

                console.log('====================== auth.ts session ======================', { session, token });

                if (token) {
                    session.user = {
                        id: token.id,
                        email: token.email,
                        name: token.name,
                        role: token.role
                    };
                }

                console.log('Backend ::::: session :::::', session);

                return session;
            },
        },
        secret: process.env.NEXTAUTH_SECRET,
        session: {
            strategy: 'jwt'
        },
        providers: [
            Credentials({
                async authorize(credentials) {

                    try {
                        console.log('====================== auth.ts Credentials authorize ======================');

                        console.log('::::: Credentials :::::', credentials);

                        const parsedCredentials = z
                            .object({ email: z.string().email(), password: z.string().min(6) })
                            .safeParse(credentials);

                        console.log('::::: parsedCredentials :::::', parsedCredentials);

                        if (!parsedCredentials.success) {
                            console.log('::::: FAILED :::::', parsedCredentials);
                            return null;
                        };

                        const { email, password } = parsedCredentials.data;
                        
                        const user: IUser | null = await getUser(email);
                        if (!user) {
                            console.log('::::: USUARIO NO ENCONTRADO :::::', parsedCredentials);
                            return null;
                        };

                        const passwordsMatch = await bcrypt.compare(password, user.profile.password);
                        if (!passwordsMatch) return null;

                        console.log('__;;;;::::::::::::::::')

                        return user;
                    } catch (error) {
                        console.error("Auth - Credentials authorize: ", error)
                    }
                },
            }),

        ],
    }

);