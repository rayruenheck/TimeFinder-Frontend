import Image from 'next/image';
import React from 'react';

interface TimeOfDayButtonProps {
  iconSrc: string;
  label: string;
  timeRange: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeOfDayButton: React.FC<TimeOfDayButtonProps> = ({ iconSrc, label, timeRange, isSelected, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-[100px] h-auto p-4 rounded-2xl border-3 border-blackish shadow-[1.5px_1.5px_blackish] cursor-pointer ${
        isSelected
          ? 'bg-blackish text-whiteish'
          : 'bg-whiteish hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-500'
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <Image src={iconSrc} alt={`${label} icon`} width={24} height={24} className="mb-2" />
      <span className="font-bold">{label}</span>
      <span className="text-sm">{timeRange}</span>
    </div>
  );
};

export default TimeOfDayButton;

