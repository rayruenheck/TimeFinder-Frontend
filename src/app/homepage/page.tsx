"use client";
import { useState, useEffect } from 'react';
import TodayTask from './TodayTask';

export default function Page() {
    const [weeklyTasksCompleted, setWeeklyTasksCompleted] = useState(0);
    const [allTimeTasksCompleted, setAllTimeTasksCompleted] = useState(0);

    const updateTaskCounters = () => {
        setWeeklyTasksCompleted(prevCount => prevCount + 1); 
        setAllTimeTasksCompleted(prevCount => prevCount + 1); 
    };

    // Simulated data fetching or calculation of tasks completed
    useEffect(() => {
        // Simulate fetching data from an API or calculation
        const weeklyCount = 50; 
        const allTimeCount = 500; 

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

            {/* Pass the updateTaskCounters function as a prop to the TodaysTasks component */}
            <TodayTask onUpdateTaskCounters={updateTaskCounters} />
        </div>
    );
}
