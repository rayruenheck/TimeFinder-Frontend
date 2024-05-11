
"use client";

import TodayTask from './TodayTask';


import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react'

import GoogleCalendar from '../components/googlecalendar';
import TaskCard from '../components/taskcard';
import { Task } from '../components/interfaces';



export default function Page() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([])
    const [weeklyTasksCompleted, setWeeklyTasksCompleted] = useState(0);
    const [allTimeTasksCompleted, setAllTimeTasksCompleted] = useState(0);  


    const updateTaskCounters = () => {
        setWeeklyTasksCompleted(prevCount => prevCount + 1); 
        setAllTimeTasksCompleted(prevCount => prevCount + 1); 
    };

    useEffect(() => {
      if (session?.sub) {
          fetch(`http://localhost:5000/get-tasks?sub=${session.sub}`)
              .then(response => response.json())
              .then(data => {
                  setTasks(data.tasks);
              })
              .catch(error => console.error("Failed to load tasks", error));
      }
  }, [session?.sub]);

  // Filter tasks based on their properties
  const scheduledTasks = tasks?.filter(task => task.isScheduled);
  const unscheduledTasks = tasks?.filter(task => !task.isScheduled);
  const completedTasks = tasks?.filter(task => task.isCompleted);


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
            <GoogleCalendar/>
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


        <div>
                <h2>Scheduled Tasks</h2>
                {scheduledTasks?.map(task => (
                    <TaskCard key={task.id} task={task} />  // Render TaskCard for each scheduled task
                ))}
            </div>
            <div>
                <h2>Unscheduled Tasks</h2>
                {unscheduledTasks?.map(task => (
                    <TaskCard key={task.id} task={task} />  // Render TaskCard for each unscheduled task
                ))}
            </div>
            <div>
                <h2>Completed Tasks</h2>
                {completedTasks?.map(task => (
                    <TaskCard key={task.id} task={task} />  // Render TaskCard for each completed task
                ))}
            </div>
      </div>
      
)
}
