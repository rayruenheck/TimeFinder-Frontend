"use client";
import ProgressBar from "@ramonak/react-progress-bar"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { CustomSession } from "./components/interfaces";

export default function Home() {
  const { data: session, status } = useSession();
    const router = useRouter();

    // Define the fetchScheduledTasks function using useCallback to memoize it
    const fetchScheduledTasks = useCallback(async (userData : CustomSession) => {
        if (session) {  
            try {
                const response = await fetch('http://localhost:5000/schedule_tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.accessToken}` // Assuming accessToken is part of session
                    },
                    body: JSON.stringify({
                        userId: userData.idToken                        
                    })
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch scheduled tasks:', error);
            }
        }
    }, [session]);  // The function depends on the session, especially session.accessToken

    useEffect(() => {
        if (status === "authenticated") {
            
            fetchScheduledTasks(session as CustomSession);
        } 
    }, [fetchScheduledTasks, status, router, session])
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <ProgressBar className="w-[400px]" completed={50} />
        <a href="/startscreen">startscreen</a>
        <a href="/googleconnect">googleconnect</a>
        <a href="/taskscreen">taskscreen</a>
            <h1>Homepage</h1>
            <p>Welcome to the homepage! Check the console for scheduled tasks or sign in.</p>
        </div>
    )

}