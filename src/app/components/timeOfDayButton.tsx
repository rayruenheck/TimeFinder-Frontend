import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';

interface TimeOfDayButtonProps {
  iconSrc: string;
  label: string;
  timeRange: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeOfDayButton: React.FC<TimeOfDayButtonProps> = ({ iconSrc, label, timeRange, isSelected, onClick }) => {
  const buttonClasses = classNames(
    'flex flex-col items-center justify-center w-[100px] h-[112px] p-[16px_0px] rounded-[16px] border-[3px] shadow-[1.5px_1.5px_#1C1C1C] cursor-pointer',
    {
      'bg-[var(--Blackish,#1C1C1C)] text-[var(--Whiteish,#F9F5F2)]': isSelected,
      'bg-[var(--Whiteish,#F9F5F2)] text-[var(--Blackish,#1C1C1C)] border-[var(--Blackish,#1C1C1C)] hover:bg-blue-500 focus:bg-blue-100 active:bg-blue-500':
        !isSelected,
    }
  );

  const imageClasses = classNames('mb-[8px]', {
    'invert': isSelected  
  });

  return (
    <div className={buttonClasses} onClick={onClick} role="button" tabIndex={0}>
      <Image src={iconSrc} alt={`${label} icon`} width={24} height={24} className={imageClasses} />
      <span className={`text-button-2 ${isSelected ? '' : "text-blackish"}`}>{label}</span>
      <span className={`text-subhead-2 ${isSelected ? '' : "text-blackish"}`}>{timeRange}</span>
    </div>
  );
};

export default TimeOfDayButton;
