import { useState } from 'react';
import Image from 'next/image';
import { DropdownProps } from './interfaces';

function Dropdown<T extends string | number>({ id, options, onChange, value }: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<T | null>(value || null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectOption = (newValue: T) => {
    onChange(newValue);
    setSelectedValue(newValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((option) => option.value === selectedValue)?.label || 'Select an option';

  const getOptionClass = (index: number, length: number, selected: boolean) => {
    let baseClass = 'cursor-pointer select-none relative py-2 pl-3 pr-9';
    let borderClass = 'border-l-3 border-r-3 border-blackish';
    let hoverFocusClass = 'hover:bg-green-100 focus:bg-green-100';

    if (index === 0 && index === length - 1) {
      // Single item
      borderClass += ' border-t-3 rounded-t-lg rounded-b-lg';
    } else if (index === 0) {
      // First item
      borderClass += ' border-t-3 rounded-t-lg';
    } else if (index === length - 1) {
      // Last item
      borderClass += ' border-b-3 rounded-b-lg';
    }

    if (selected) {
      return `${baseClass} ${borderClass} bg-green-100`;
    } else {
      return `${baseClass} ${borderClass} ${hoverFocusClass}`;
    }
  };

  return (
    <div className="relative w-full max-w-[361px]">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`inline-flex justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-whiteish border-2 border-blackish rounded-lg hover:bg-green-100 focus:bg-green-100`}
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
          className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-b-lg max-h-56 overflow-auto focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
          aria-labelledby={id}
        >
          {options.map((option, index) => (
            <li
              key={option.value.toString()}
              onClick={() => handleSelectOption(option.value)}
              className={getOptionClass(index, options.length, selectedValue === option.value)}
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


