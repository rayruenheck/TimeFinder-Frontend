
"use client"
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react'

import GoogleCalendar from '../components/googlecalendar';
import TaskCard from '../components/taskcard';
import { Task } from '../components/interfaces';
import Header from '../components/header';



export default function Page() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([])
    

    const formatDate = () => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        const today = new Date();
        return today.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
      if (session?.sub) {
          fetch(`https://timefinder-backend-2.onrender.com/get-tasks?sub=${session.sub}`)
              .then(response => response.json())
              .then(data => {
                  setTasks(data.tasks);
              })
              .catch(error => console.error("Failed to load tasks", error));
      }
  }, [session?.sub]);

  
  const scheduledTasks = tasks?.filter(task => task.isScheduled);
  const unscheduledTasks = tasks?.filter(task => !task.isScheduled);
  const completedTasks = tasks?.filter(task => task.isCompleted);


   
    

    return (
        <div>
            <Header progressBarNumber={0} />
        <div>
            <h2 className="text-heading-2 m-4">{formatDate()}</h2>
            <GoogleCalendar/>
            <h2 className="text-heading-2 m-4 mt-[40px]">Today&apos;s Scheduled Tasks</h2>
            <p className="text-subhead-1 m-4">Here are your auto-scheduled tasks for today. Feel free to mark them as complete any time during the day. Any
            task you don&apost complete will return to the Task List at the end of the day.</p>

            {scheduledTasks?.map(task => (
                    <TaskCard key={task.id} task={task} />  // Render TaskCard for each scheduled task
                ))}

        </div>
        <div className="custom-div flex flex-col items-center gap-[10px]">
            <p className='completed-this-week-number' >{completedTasks.length}</p>
            <p className='completed-this-week'>Task&apos;s completed this week</p>
            <div className='flex'>
                <p className='completed-all-time'>Task&apos;s completed all time:</p>
                <p className='completed-all-time-number ml-4'>{completedTasks.length}</p>
            </div>
            
        </div>
        <div className="custom-div-2 flex flex-col items-center ">
                <p className='text-heading-5 ml-4 mb-4'>unscheduled task&apos;s</p>
                <p className='text-subhead-3 ml-4 mb-[40px]'>Add new tasks and TimeFinder will prioritize and schedule up to 5 tasks tomorrow. Remember, not all tasks need to be productive! We encourage you to add tasks that help you rest and reset too.</p>
                <button className='button-1 w-[172px] h-[32px] mb-[32px]'>add task</button>
                <div className='w-full flex items-start justify-start'>{unscheduledTasks?.map(task => (
                    <TaskCard key={task.id} task={task} />  // Render TaskCard for each scheduled task
                ))}
                </div>
        </div>
            
      </div>
      
)
}
