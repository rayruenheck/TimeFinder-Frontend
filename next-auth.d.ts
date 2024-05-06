import 'next-auth';

declare module 'next-auth' {
  /**
   * Adds custom properties to the built-in session object.
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    accessTokenExpires?: number;
    email?: string;
    name?: string;
    sub?: string
  }
}

