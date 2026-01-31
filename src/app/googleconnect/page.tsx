"use client"
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import EducationCard from '../components/educationcard';

interface EducationCardProps {
    iconSrc: string;
    headerText: string;
    subheadText: string;
  }
  
  const educationCards: EducationCardProps[] = [
    { iconSrc: "/images/NotePencil.png", headerText: "list your tasks", subheadText: "Add everything you want to get done! Just add a name and a few details, that's it." },
    { iconSrc: "/images/Funnel.png", headerText: "we sort your tasks", subheadText: "TimeFinder uses task details, such as priority and concentration required, to run the tasks through an algorithm to match the right task to the right time." },
    { iconSrc: "/images/CalendarDots.png", headerText: "we schedule your tasks", subheadText: "TimeFinder will add up to 5 tasks to your Google Calendar between 8am to 8pm, based on priority while reserving your peak productivity time for your high concentration tasks." },
    { iconSrc: "/images/BellRinging.png", headerText: "Confirm in the morning", subheadText: "To help you build good task management habits, TimeFinder will alert you at 8am every morning to view your auto-scheduled tasks for the day." },
    { iconSrc: "/images/ListChecks.png", headerText: "DO THE STUFF", subheadText: "Complete your scheduled tasks throughout the day. At any time, you can add more tasks to be scheduled for a later day." },
    { iconSrc: "/images/Medal.png", headerText: "Review in the evening", subheadText: "Just like in the morning, TimeFinder will alert you at 8pm to cross off your tasks and celebrate! Enjoy your accomplishments!" },
    { iconSrc: "/images/Repeat.png", headerText: "REPEAT", subheadText: "Overnight, TimeFinder keeps working while you rest your successful head, moving incomplete tasks back to your list, optimizing it, and moving on to schedule the next day." }
  ];


export default function Page() {
    const [updateCalled, setUpdateCalled] = useState(false)
    const { data: session } = useSession();
    

    const router = useRouter();

    const scheduleNotifications = useCallback(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedule_notifications`, {
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

    const updateUser = useCallback(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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
                setUpdateCalled(true);
                scheduleNotifications()



            }
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
    }, [session, updateCalled, scheduleNotifications]);

    const handleSignIn = () => {
        signIn('google', { callbackUrl: '/taskscreen' });
    };

    useEffect(() => {
        if (!updateCalled) {
            updateUser();
        }
    }, [updateUser, updateCalled])

    return (
        <div className="text-center">
          <Header progressBarNumber={1} />
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <h1 className="text-heading-2 mb-[40px]">How does timefinder work?</h1>
            {/* Map through educationCards array and render EducationCard for each item */}
            {educationCards.map(card => (
              <EducationCard key={card.iconSrc} iconSrc={card.iconSrc} headerText={card.headerText} subheadText={card.subheadText} />
            ))}
            <button className="button-1 mb-[64px]" onClick={handleSignIn}>Create account with google</button>
          </div>
        </div>
      );
}