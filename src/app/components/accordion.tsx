import Image from 'next/image';
import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="w-full border-t-2 border-blackish">
      <button
        type="button"
        onClick={toggleAccordion}
        className={`flex justify-between items-center w-full h-16 px-4 text-left text-h3 font-bold ${
          isOpen ? 'bg-blue-100' : 'bg-whiteish'
        } outline-none`}
      >
        <span className="text-blackish font-gabarito text-heading-3 font-bold uppercase ">{title}</span>

        <Image
          src={isOpen ? '/images/caret-up-lg.png' : '/images/caret-lg.png'}
          alt="Caret Icon"
          width={32}
          height={32}
        />
      </button>
      {isOpen && <div className="py-8 px-4 bg-blue-100 outline-none">{children}</div>}
    </div>
  );
};

export default Accordion;

