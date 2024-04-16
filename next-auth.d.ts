import 'next-auth';

declare module 'next-auth' {
  /**
   * Adds custom properties to the built-in session object.
   */
  interface Session {
    accessToken?: {};
  }
}