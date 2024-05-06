import React, { useCallback, useEffect, useState, memo } from 'react';
import { useSession } from 'next-auth/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Event } from './interfaces';

const GoogleCalendar = memo(() => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = useCallback(async () => {
    if (!session?.accessToken || !session?.sub) return;

    const response = await fetch(`http://127.0.0.1:5000/user_calendar_events`, {
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
        start: event.start.dateTime || event.start.date, // Handle all-day events
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
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridDay"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        }}
      />
    </div>
  );
});

GoogleCalendar.displayName = 'GoogleCalendar'; // Set display name

export default GoogleCalendar;