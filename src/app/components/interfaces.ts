import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface TaskFormProps {
    taskId: number;
  }
export interface TaskCardProps {
    taskId: number;
    onClick: (taskId: number) => void;
  }

export interface Event {
    title: string;
    start: string; // ISO date string
    end: string;   // ISO date string
  }

  export interface CustomJWT extends JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    accessTokenExpires?: number;
    email?: string;
    name?: string;
    id?: string;
  }
  
  export interface CustomSession extends Session {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    accessTokenExpires?: number;
    email?: string;
    name?: string;
    
  }

export interface Option<T extends string | number> {
  value: T;
  label: string;
}

export interface DropdownProps<T extends string | number> {
  id: string;
  options: Option<T>[];
  value: T | null;  
  onChange: (value: T) => void;
  placeholder: string
}

export interface Task {
  id : string
  name: string;
  time: string;
  priority: string;
  concentration: string;
  isScheduled: boolean
  isCompleted: boolean
  start_time: string
  end_time: string
}

export interface ConcentrationTime {
  start: string
  end: string
}
