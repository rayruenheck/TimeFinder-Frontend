import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextApiRequest, NextApiResponse } from "next";
import { CustomJWT, CustomSession } from "@/app/components/interfaces";
const options: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),
    ],
    session: {
      strategy: 'jwt'
    },
    callbacks: {
      jwt: async ({ token, account, profile }) => {
        const customToken = token as CustomJWT;
        if (account) {
            customToken.accessToken = account.access_token;
            customToken.refreshToken = account.refresh_token;
            customToken.idToken = account.id_token;
            
        }
        if (profile) {
            customToken.email = profile.email;
            customToken.name = profile.name;
        }
        return customToken;
      },
      session: async ({ session, token }) => {
        const customSession = session as CustomSession;  // Cast session to your custom type
        const customToken = token as CustomJWT;  // Cast token to your custom JWT type

        // Assign token properties to session properties
        customSession.accessToken = customToken.accessToken;
        customSession.refreshToken = customToken.refreshToken;
        customSession.idToken = customToken.idToken;
        

        if (customToken.email) {
            customSession.user.email = customToken.email;
        }
        if (customToken.name) {
            customSession.user.name = customToken.name;
        }

        return customSession;
      }
    }
  };

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, options);
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, options);
}