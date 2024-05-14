import React from 'react';
import Image from 'next/image';

// Define an interface for the component props
interface EducationCardProps {
  iconSrc: string;
  headerText: string;
  subheadText: string;
}

// Apply the interface to the function component
const EducationCard: React.FC<EducationCardProps> = ({ iconSrc, headerText, subheadText }) => {
    return (
        <div className="w-[393px] bg-blue-500 grid" style={{ gridTemplateColumns: '62px 1fr' }}>
          <div className="flex flex-col items-center justify-start">
            <Image 
              src={iconSrc} 
              alt="icon" 
              width={30} 
              height={30} 
              className="w-[30px] h-[30px]"
            />
          </div>
          <div className="flex flex-col justify-start text-start mr-[16px]">
            <h1 className="text-heading-4">{headerText}</h1>
            <p className="text-subhead-2 mb-[40px]">{subheadText}</p>
          </div>
        </div>
      );
    
};

export default EducationCard;