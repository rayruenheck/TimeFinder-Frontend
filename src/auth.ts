import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { CustomSession, CustomJWT } from "./app/components/interfaces";

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GoogleProvider({
    clientId : process.env.AUTH_GOOGLE_ID!,
    clientSecret : process.env. AUTH_GOOGLE_SECRET!,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    }
  })],
  callbacks: {
    async jwt({ token, account, profile }) {
      const customToken: CustomJWT = token as CustomJWT;

      if (account) {
        customToken.accessToken = account.access_token;
        customToken.refreshToken = account.refresh_token;
        customToken.accessTokenExpires = account.expires_at ? Number(account.expires_at) * 1000 : undefined;
        customToken.idToken = account.id_token;
      }
      if (profile) {
        customToken.email = profile.email || null || undefined ;
        customToken.name = profile.name || null || undefined;
      }
      return customToken;
    },
    async session({ session, token }) {
      const customSession: CustomSession = session as CustomSession;
      const customToken = token as CustomJWT;

      customSession.accessToken = customToken.accessToken;
      customSession.refreshToken = customToken.refreshToken;
      customSession.idToken = customToken.idToken;
      customSession.accessTokenExpires = customToken.accessTokenExpires;
      customSession.user = {
        ...customSession.user,
        email: customToken.email ,
        name: customToken.name 
      };
      return customSession;
    }
  }
})