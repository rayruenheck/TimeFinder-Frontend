"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import Header from "./components/header";
import Link from "next/link";


export default function Home() {
  const { data: session, status } = useSession();
    const router = useRouter();

    // Define the fetchScheduledTasks function using useCallback to memoize it
    const fetchScheduledTasks = useCallback(async () => {
        if (session?.accessToken && session?.sub) {  // Check for necessary session parts to exist
            try {
                const response = await fetch('http://localhost:5000/schedule_tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.accessToken}` // Ensuring accessToken is still valid
                    },
                    body: JSON.stringify({
                        sub: session?.sub // Assuming you store Google's `sub` as userId in the session
                    })
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch scheduled tasks:', error);
            }
        }
    }, [session?.accessToken, session?.sub]);  // The function depends on the session, especially session.accessToken

    useEffect(() => {        
            
        fetchScheduledTasks();
    
    }, [fetchScheduledTasks])
    return (
        <div className='container mx-auto p-4 w-[393px]'>
        <Header progressBarNumber={0}/>
        <div className="flex flex-col items-center justify-center h-screen">
          
          {/* <TimeFinderLogo /> */}
          <h2 className="text-3xl font-bold mb-4">Welcome to Your Time Finder</h2>
          <p className="text-lg mb-4">
            Where finding the right time for the right task is done for you.
          </p>
          <Image width={50} height={50} src="/images/TimeFinderImage.jpg" alt="TimeFinder Image" className="w-64 h-auto mb-4" />
          <p className="text-lg mb-4">
            Time Finder helps you schedule your tasks to get them done by matching open times to your productivity and peak concentration increasing your success!
          </p>
          <button onClick={()=>{router.push('/googleconnect')}} className="button-1">
           
          </button>
          <h3 className="text-xl font-bold mt-4">Already have and account? Sign in here.</h3>
        </div>
        </div>
      );

}