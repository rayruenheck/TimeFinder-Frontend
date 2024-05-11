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

    // // Define the fetchScheduledTasks function using useCallback to memoize it
    // const fetchScheduledTasks = useCallback(async () => {
    //     if (session?.accessToken && session?.sub) {  // Check for necessary session parts to exist
    //         try {
    //             const response = await fetch('http://localhost:5000/schedule_tasks', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${session?.accessToken}` // Ensuring accessToken is still valid
    //                 },
    //                 body: JSON.stringify({
    //                     sub: session?.sub // Assuming you store Google's `sub` as userId in the session
    //                 })
    //             });
    //             const data = await response.json();
    //             console.log(data);
    //         } catch (error) {
    //             console.error('Failed to fetch scheduled tasks:', error);
    //         }
    //     }
    // }, [session?.accessToken, session?.sub]);  // The function depends on the session, especially session.accessToken

    // useEffect(() => {        
            
    //     fetchScheduledTasks();
    
    // }, [fetchScheduledTasks])
    return (
        <div className='mx-auto p-4 w-[393px]'>
        <Header progressBarNumber={0}/>
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
        <Image width={300} height={300} src="/images/startscreen pic.png" alt="TimeFinder Image" className="w-64 h-auto mb-4" />
          <h2 className="text-heading-2 mt-[64px]">Scheduling the right task at the right time for you</h2>
          <p className="text-subhead-1 mt-[16px]">
           TimeFinder helps you complete your tasks by scheduling your tasks for you. Matching tasks to open times to your time of peak concentration increasing your succes!
          </p>
          <button onClick={()=>{router.push('/googleconnect')}} className="button-1 mt-[40px]">get started</button>
          <h3 className="button-2 mt-[16px]">Already have and account? Sign in here.</h3>
          </div>
        </div>
        
      );

}