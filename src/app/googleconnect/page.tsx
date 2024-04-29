"use client"
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { CustomSession } from '../components/interfaces';

export default function Page() {
    const { data: session } = useSession();
    

    const router = useRouter();

    const updateTasks = useCallback((userData : CustomSession) => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            const tasksApiUrl = 'http://localhost:5000/tasks';
            fetch(tasksApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userData.idToken,
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
    }, []);

    const updateUser = useCallback((userData: CustomSession) => {
        
        const apiUrl = 'http://localhost:5000/users';

        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: userData.email,
                name: userData.name,
                accessToken: userData.accessToken,
                refreshToken: userData.refreshToken,
                idToken: userData.idToken,
                accessTokenExpires: userData.accessTokenExpires,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('User updated:', data);
            updateTasks(userData);
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
    }, [updateTasks]);

    

    useEffect(() => {
        if (session) {
            updateUser(session as CustomSession);
        }
    }, [session, updateUser]);

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