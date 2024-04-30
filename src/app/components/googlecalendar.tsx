import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


export default function GoogleCalendar() {
  const [calendarId, setCalendarId] = useState('');
  const { data: session } = useSession();

  const getCalendarId = useCallback(() => {
    if (session?.accessToken) {  // Using optional chaining to ensure accessToken exists
      const tasksApiUrl = 'http://localhost:5000/get_primary_calendar_id';
      fetch(tasksApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: session.accessToken
        }),
      })
      .then(response => response.json())
      .then(data => {
        setCalendarId(data.calendarId);
      })
      .catch((error) => {
        console.error('Error fetching calendar ID:', error);
      });
    }
  }, [session]);

  useEffect(() => {
    if (session?.accessToken) {
      getCalendarId();
    }
  }, [session, getCalendarId]);

  return (
    <div>
       
    </div>
  );
}