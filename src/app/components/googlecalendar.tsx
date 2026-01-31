import React, { useCallback, useEffect, useState, memo } from 'react';
import { useSession } from 'next-auth/react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Event } from './interfaces';


const GoogleCalendar = memo(() => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  
  const eventContent = (arg: any) => {
    const title = arg.event.title;
    const containsTimeFinder = title.includes('TimeFinder');
    const backgroundColor = containsTimeFinder ? '#F1FF8D' : '#3788d8';

    return (
      <div style={{ backgroundColor, color: '#000' }}>
        {title}
      </div>
    );
  };

  const fetchEvents = useCallback(async () => {
    if (!session?.accessToken || !session?.sub) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user_calendar_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`
      },
      body: JSON.stringify({ sub: session.sub })
    });

    if (response.ok) {
      const fetchedEvents: any[] = await response.json();
      const formattedEvents: Event[] = fetchedEvents.map(event => ({
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date
      }));
      setEvents(formattedEvents);
    } else {
      console.error('Failed to fetch events:', response.status);
    }
  }, [session]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className='m-4 '>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        events={events}
        headerToolbar={false}
        eventContent={eventContent}
      />
    </div>
  );
})
GoogleCalendar.displayName = 'GoogleCalendar'; // Set display name

export default GoogleCalendar;