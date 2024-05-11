"use client"
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';


export default function Page() {
    const [updateCalled, setUpdateCalled] = useState(false)
    const { data: session } = useSession();
    

    const router = useRouter();

    const scheduleNotifications = useCallback(() => {
        const notificationsApiUrl = 'http://localhost:5000/schedule_notifications';
        fetch(notificationsApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sub: session?.sub  // Ensure you send the necessary data; here, it's assumed 'sub' is sufficient
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Notifications scheduled:', data);
        })
        .catch((error) => {
            console.error('Error scheduling notifications:', error);
        });
    }, [session?.sub])

    const updateTasks = useCallback(() => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            const tasksApiUrl = 'http://localhost:5000/tasks';
            fetch(tasksApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sub: session?.sub,
                    tasks: JSON.parse(tasks),
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Tasks updated:', data);
                
            })
            .catch((error) => {
                console.error('Error updating tasks:', error);
            });
        } 
    }, [session?.sub]);

    const updateUser = useCallback(() => {
        const apiUrl = 'http://localhost:5000/users';
    
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: session?.email,
                name: session?.name,
                accessToken: session?.accessToken,
                refreshToken: session?.refreshToken,
                idToken: session?.idToken,
                accessTokenExpires: session?.accessTokenExpires,
                sub: session?.sub
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('User updated:', data);
            if (!updateCalled) {
                updateTasks();
                setUpdateCalled(true);
                scheduleNotifications()
            }
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
    }, [session, updateCalled, updateTasks, scheduleNotifications]);

    

    useEffect(() => {
        if (!updateCalled) {
            updateUser();
        }
    }, [updateUser, updateCalled])

    return (
        <div className="container mx-auto p-4 text-center">
      
      <img src="/images/Progress Bar 2.png" alt="Progress Bar 2" className="mx-auto mb-8" />
      <img src="/images/New event added - TimeFinder.png" alt="Scheduling your tasks" className="mx-auto mb-8" />
      <h1 className="text-3xl font-bold mb-4">Scheduling your tasks increases the likelihood of completion by 30%</h1>
      <p className="text-lg text-gray-600 mb-8">TimeFinder will schedule the <strong>right tasks</strong> at the <strong>right times</strong> on your Google Calendar to help you successfully get things done.</p>
      <button className="bg-blue-600 py-2 px-6 rounded-md mb-2" onClick={() => signIn('google')}>Connect my Google Calendar</button>
      
      
      
    </div>
        
    );
}