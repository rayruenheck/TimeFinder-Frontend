'use client';
import { useSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import TimeOfDayButton from '../components/timeOfDayButton';
import { CustomSession, ConcentrationTime } from '../components/interfaces';

export default function Page() {
  const { data: session } = useSession();
  const [concentrationTime, setConcentrationTime] = useState<ConcentrationTime>({ start: '', end: '' });
  const [selectedConcentration, setSelectedConcentration] = useState('');

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
        } catch (error) {
          console.error('Failed to fetch scheduled tasks:', error);
        }
      }
    },
    [session]
  );

  useEffect(() => {
    console.log(concentrationTime);
  }, [concentrationTime]);

  const setConcentrationTimeRange = (concentration: string, start: string, end: string) => {
    setConcentrationTime({ start, end });
    handleConcentrationClick(concentration);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-4">When do you have the highest levels of concentration?</h2>

      {/* Subtext */}
      <p className="text-lg text-gray-600 text-center mb-6">
        This is the last bit of data we need to organize your tasks to take advantage of when you are the most productive
        and likely to be successful!
      </p>

      {/* Concentration Buttons */}
      <div className="flex justify-center mb-8">
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
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full block mx-auto ${
          selectedConcentration ? '' : 'opacity-50 cursor-not-allowed'
        }`}
        onClick={() => updateUser(session as CustomSession, concentrationTime)}
        disabled={!selectedConcentration}
      >
        Schedule my tasks for tomorrow
      </button>
    </div>
  );
}
