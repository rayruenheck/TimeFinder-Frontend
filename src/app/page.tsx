"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
    const router = useRouter();

    // Define the fetchScheduledTasks function using useCallback to memoize it
    const fetchScheduledTasks = useCallback(async () => {
        if (session) {  // Ensure session is available
            try {
                const response = await fetch('http://localhost:5000/schedule_tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.accessToken}` // Assuming accessToken is part of session
                    }
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
            fetchScheduledTasks();
        } else {
            // Redirect to the Google connect page if the user is not authenticated
            router.push('/googleconnect');
        }
    }, [fetchScheduledTasks, status, router])
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <a href="/startscreen">startscreen</a>
        <a href="/googleconnect">googleconnect</a>
        <a href="/taskscreen">taskscreen</a>
            <h1>Homepage</h1>
            <p>Welcome to the homepage! Check the console for scheduled tasks or sign in.</p>
        </div>
    )

}