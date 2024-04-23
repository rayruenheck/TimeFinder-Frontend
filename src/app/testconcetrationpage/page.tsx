'use client'
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';

// Assuming concentrationTime interface is defined as {start: string, end: string}
import { CustomSession, ConcentrationTime } from '../components/interfaces';

export default function Page() {
    const { data: session } = useSession();
    const [concentrationTime, setConcentrationTime] = useState<ConcentrationTime>({ start: '', end: '' });

    useEffect(()=>{
        console.log(concentrationTime)
    },[concentrationTime])

    const updateUser = useCallback(async (userData: CustomSession, times: ConcentrationTime) => {
        if (session) {
            try {
                const response = await fetch('http://localhost:5000/concentration_time', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userData.idToken,
                        start: times.start,
                        end: times.end
                    })
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Failed to fetch scheduled tasks:', error);
            }
        }
    }, [session]);

    // Example time slots
    const timeSlots = [
        { start: '08:00', end: '11:59' },
        { start: '12:00', end: '15:59' },
        { start: '16:00', end: '20:00' }
    ];

    return (
        <div>
            {timeSlots.map((time, index) => (
                <button key={index} onClick={() => setConcentrationTime(time)}>
                    Set Time {index + 1}: {time.start} to {time.end}
                </button>
            ))}
            <button onClick={() => updateUser(session as CustomSession, concentrationTime)}>Update User Time</button>
        </div>
    );
}