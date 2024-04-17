// imports
import NextAuth from "next-auth"

// importing providers

import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          })
    ],
    callbacks: {
      jwt: async ({ token, user }) => {
        return { ...token, ...user };
      },
      session: async ({ session, token }) => {
        session.user = token;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }