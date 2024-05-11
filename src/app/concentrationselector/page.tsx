'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import TimeOfDayButton from '../components/timeOfDayButton';
import { CustomSession, ConcentrationTime } from '../components/interfaces';
import Header from '../components/header';
import { useRouter } from 'next/navigation';


export default function Page() {
  const { data: session } = useSession();
  const [concentrationTime, setConcentrationTime] = useState<ConcentrationTime>({ start: '', end: '' });
  const [selectedConcentration, setSelectedConcentration] = useState('');
  const router = useRouter()
  

  const handleConcentrationClick = (concentration: string) => {
    setSelectedConcentration(concentration);
  };

  const updateUser = useCallback(
    async (userData: CustomSession, times: ConcentrationTime) => {
      if (session) {
        try {
          const response = await fetch('http://localhost:5000/concentration_time', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sub: userData.sub,
              start: times.start,
              end: times.end,
            }),
          });
          const data = await response.json();
          console.log(data);
          router.push('/schedulepage')
        } catch (error) {
          console.error('Failed to fetch scheduled tasks:', error);
        }
      }
    },
    [session, router]
  );

  useEffect(() => {
    console.log(concentrationTime);
  }, [concentrationTime]);

  const setConcentrationTimeRange = (concentration: string, start: string, end: string) => {
    setConcentrationTime({ start, end });
    handleConcentrationClick(concentration);
  };

  return (
    <div className="container mx-auto p-4 w-[393px]">
      <Header progressBarNumber={3}/>
      <div
        style={{
          display: 'flex',
          width: '393px',
          padding: '0 16px',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
        }}
        className="mx-auto mb-8"
      >
        {/* Header */}
        <h2 className="text-heading-2 font-bold">When do you have the highest levels of concentration?</h2>

        {/* Subheader */}
        <p className="text-subhead-1 mb[40px]">
          We want to schedule your tasks that require high concentration during times when you are most productive. All
          other tasks will be scheduled outside of this time period.
        </p>
      </div>

      {/* Concentration Buttons */}
      <div className="flex justify-center mb-[64px]">
        <TimeOfDayButton
          iconSrc="/images/Sun.png"
          label="Morning"
          timeRange="8am-12pm"
          isSelected={selectedConcentration === 'morning'}
          onClick={() => setConcentrationTimeRange('morning', '08:00', '11:59')}
        />
        <div className="mx-4">
          <TimeOfDayButton
            iconSrc="/images/SunHorizon.png"
            label="Midday"
            timeRange="12pm-4pm"
            isSelected={selectedConcentration === 'midday'}
            onClick={() => setConcentrationTimeRange('midday', '12:00', '15:59')}
          />
        </div>
        <TimeOfDayButton
          iconSrc="/images/MoonStars.png"
          label="Evening"
          timeRange="4pm-8pm"
          isSelected={selectedConcentration === 'evening'}
          onClick={() => setConcentrationTimeRange('evening', '16:00', '20:00')}
        />
      </div>

      {/* Button */}
      <button
          className={`button-1 rounded-[32px] ${selectedConcentration ? '' : 'cursor-not-allowed'}`}
          onClick={() => updateUser(session as CustomSession, concentrationTime)}
          disabled={!selectedConcentration}
        >
          Schedule my tasks for tomorrow
        </button>
    </div>
  );
}
