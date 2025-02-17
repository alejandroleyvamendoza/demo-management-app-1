import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt  from 'bcryptjs';
import { PrismaClient, User } from '@prisma/client';

async function getUser(email: string): Promise<User | null> {
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        return user;

    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}


const handler = NextAuth({
    callbacks: {
        async jwt({ token, user }) {

            console.log('NextAuth handler token', token)
            console.log('NextAuth handler user', user)

            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    name: token.name,
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Asegúrate de definir esta variable en .env
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) return null;

                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password || '');
                if (!passwordsMatch) return null;

                return user;
            },
        }),

    ],
})

export { handler as GET, handler as POST }