import prisma from "@/lib/db";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
      strategy: 'jwt',
      maxAge: 24*60*60
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) { 
                const admins = await prisma.admin.findMany()
                console.log("admins : " , admins)
                for (let i = 0 ; i < admins.length ; i++){
                    if (admins[i].password === credentials.password && admins[i].username === credentials.username){
                        return credentials 
                    } 
                }          
                     return null      
                 },
        }),

    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            // console.log("session",session)
            // console.log("new date()",new Date())
         

            return session
        }
    },


});
