import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface TaskFormProps {
    taskId: number;
  }
export interface TaskCardProps {
    taskId: number;
    onClick: (taskId: number) => void;
  }


export interface CustomJWT extends JWT {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpires?: number;
  email?: string;
  name?: string;
}

export interface CustomSession extends Session {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  accessTokenExpires?: number;
  user: {
      email?: string;
      name?: string;
  }
}