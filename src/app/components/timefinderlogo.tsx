import React from 'react';
import Image from 'next/image';

const TimeFinderLogo: React.FC = () => {
  return (
    <div className="flex items-center justify-start mb-4">
      <Image src="/timefinder-logo.png" width={100} height={100} alt="TimeFinder Logo" className="w-10 h-auto" />
      <h1 className="text-2xl font-bold ml-2">Time Finder</h1>
    </div>
  );
};

export default TimeFinderLogo;
