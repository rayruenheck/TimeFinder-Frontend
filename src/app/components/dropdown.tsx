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


  return (
    <div className="relative w-full mb-4">
  <button
    type="button"
    onClick={toggleDropdown}
    className={`inline-flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-whiteish ${
      isOpen ? "border-2 border-blackish rounded-t-lg" : "border-2 border-blackish rounded-lg"
    } `}
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
      className="border-x-2 border-b-2 border-blackish bg-whiteish rounded-b-lg gap-[8px]"
      tabIndex={-1}
      role="listbox"
      aria-labelledby={id}
    >
      {options.map((option, index) => (
        <li
          key={option.value.toString()}
          onClick={() => handleSelectOption(option.value)}
          className="flex items-center cursor-pointer select-none relative py-2 pl-3 pr-9"
          role="option"
          aria-selected={selectedValue === option.value}
        >
          <span className="ml-3 block font-normal truncate">{option.label}</span>
        </li>
      ))}
    </ul>
  )}
</div>
  );
}

export default Dropdown;
