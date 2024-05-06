import { useEffect } from 'react';
import { useRouter } from 'next/router';

const DayCalendarEmbed = () => {
  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  const router = useRouter();
  const googleCalendarUrl = 'YOUR_GOOGLE_CALENDAR_URL_HERE'; // Insert the API for the calendar here

  const openGoogleCalendar = () => {
    window.open(googleCalendarUrl, '_blank');
  };

  useEffect(() => {
    router.prefetch(googleCalendarUrl); // Pre-fetch the Google Calendar URL
  }, [router, googleCalendarUrl]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Today's Date: {formattedDate}</h2>
      <iframe
        src={googleCalendarUrl}
        width="100%"
        height="50vh"
        frameBorder="0"
        scrolling="yes"
        title="Day Calendar"
      ></iframe>
      <p className="text-center mt-4">Click on the calendar to open in a new tab for full functionality.</p>
    </div>
  );
};

export default DayCalendarEmbed;

