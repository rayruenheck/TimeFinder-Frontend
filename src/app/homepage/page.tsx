"use client"
import { useState, useEffect } from 'react'

export default function Page() {
    const [weeklyTasksCompleted, setWeeklyTasksCompleted] = useState(0);
    const [allTimeTasksCompleted, setAllTimeTasksCompleted] = useState(0);
  
    // Simulated data fetching or calculation of tasks completed
    useEffect(() => {
      // Simulate fetching data from an API or calculation
      const weeklyCount = 50; // Example count for weekly tasks completed
      const allTimeCount = 500; // Example count for all-time tasks completed
  
      setWeeklyTasksCompleted(weeklyCount);
      setAllTimeTasksCompleted(allTimeCount);
    }, []); 
    return (
      <div>
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
