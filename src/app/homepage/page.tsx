"use client"
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react'
import { CustomSession } from '../components/interfaces'
import GoogleCalendar from '../components/googlecalendar';


export default function Page() {
    const [weeklyTasksCompleted, setWeeklyTasksCompleted] = useState(0);
    const [allTimeTasksCompleted, setAllTimeTasksCompleted] = useState(0);
    ;


  
    
    useEffect(() => {
      
      const weeklyCount = 50; 
      const allTimeCount = 500; 
  
      setWeeklyTasksCompleted(weeklyCount);
      setAllTimeTasksCompleted(allTimeCount);
    }, []); 
    return (
      <div>
        <GoogleCalendar/>
        <div>
          <h2>{weeklyTasksCompleted}</h2>
          <p>tasks completed this week</p>
        </div>
        
        <div>
          <h2>{allTimeTasksCompleted}</h2>
          <p>Tasks completed all time</p>
        </div>
      </div>
    )
}
