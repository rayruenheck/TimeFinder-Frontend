'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { DropdownProps } from './interfaces';

function Dropdown<T extends string | number>({ id, options, onChange, value, placeholder }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T | null>(value || null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = (newValue: T) => {
    onChange(newValue);
    setSelectedValue(newValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || placeholder || 'Select an option';

  const getOptionClass = (index: number, length: number, ) => {
    let baseClass = 'cursor-pointer select-none relative py-2 pl-3 pr-9';
    let borderClass = 'border-t-2 border-b-2 border-blackish';
    

    if (index === 0 && index === length - 1) {
      // Single item
      borderClass += ' rounded-t-lg rounded-b-lg';
    } else if (index === 0) {
      // First item
      borderClass += ' rounded-t-lg';
    } else if (index === length - 1) {
      // Last item
      borderClass += ' rounded-b-lg';
    }

    return `${baseClass} ${borderClass}`;
  };

  return (
    <div className="relative w-full max-w-[361px] mb-4">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`inline-flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-whiteish border-t-2 border-b-2 border-blackish rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={id}
      >
        <span className="block truncate">{selectedLabel}</span>
        <Image
          src={isOpen ? '/images/caret-up-sm.png' : '/images/caret-sm.png'}
          alt="Caret Icon"
          width={24}
          height={24}
        />
      </button>
      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-b-lg h-[287] overflow-auto focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option, index) => (
            <li
              key={option.value.toString()}
              onClick={() => handleSelectOption(option.value)}
              className=''
              role="option"
              aria-selected={selectedValue === option.value}
            >
              <div className="flex items-center">
                <span className="ml-3 block font-normal truncate">{option.label}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
