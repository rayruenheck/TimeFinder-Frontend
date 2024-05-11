"use client"
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import Header from '../components/header';
import { useSession } from 'next-auth/react';

export default function Page() {
    const [rotationIndex, setRotationIndex] = useState(0);
    const [redirect, setRedirect] = useState(false);

    const { data: session} = useSession();
    

    
    const fetchScheduledTasks = useCallback(async () => {
        if (session?.accessToken && session?.sub) {  
            try {
                const response = await fetch('http://localhost:5000/schedule_tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session?.accessToken}`
                    },
                    body: JSON.stringify({
                        sub: session?.sub 
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
  
    const wheelImages = [
      '/images/Spinner 1.png',
      '/images/Spinner 2.png',
      '/images/Spinner 3.png',
      '/images/Spinner 4.png',
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setRotationIndex((prevIndex) => (prevIndex + 1) % wheelImages.length);
      }, 600);
  
      const redirectTimeout = setTimeout(() => {
        setRedirect(true);
      }, wheelImages.length * 600);
  
      return () => {
        clearInterval(interval);
        clearTimeout(redirectTimeout);
      };
    }, [wheelImages.length]);
  
    useEffect(() => {
      if (redirect) {
        window.location.href = "/homepage";
      }
    }, [redirect]);
  
    return (
      <div className="container mx-auto p-4 w-[393px]">
        <Header progressBarNumber={4} />
        <div className="flex flex-col items-center gap-4 w-[393px] px-4">
          <h1 className="text-heading-2 mt-16 mb-4 text-center">Scheduling your tasks for you</h1>
          <p className="text-subhead-1">This will take less than 5 seconds.</p>
        </div>
        <div className="mt-[40px] w-[393px] flex justify-center">
        <Image src={wheelImages[rotationIndex]} height={32} width={32} alt="Rotating Wheel" className="animate-spin" />
        </div>
      </div>
    )
}
