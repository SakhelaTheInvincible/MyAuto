import React, { useState } from "react";
import OutsideClickHandler from "../helper/OutsideClickHandler";

type DropdownProps = {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelectOption(option);
    setIsOpen(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="ml-2 inline-block relative text-gray-800">
        <div className="relative">
          <button
            type="button"
            className="py-2 pl-3 pr-8 text-left border border-gray-300 rounded-md shadow-sm cursor-pointer"
            onClick={toggleDropdown}
          >
            {selectedOption}
            <div
              className={`absolute top-4 right-4 border-l-2 border-b-2 border-[#6F7383] w-[6px] h-[6px] transition-transform duration-300 -rotate-45 ${
                isOpen ? "transform rotate-[135deg]" : ""
              }`}
            ></div>
          </button>
          {isOpen && (
            <div className="absolute min-w-32 py-2 mt-2 space-y-1 bg-white border border-gray-300 rounded-md shadow-sm z-20 flex flex-col">
              {options.map(
                (option) =>
                  option !== selectedOption && (
                    <label
                      key={option}
                      className="px-4 py-2 cursor-pointer text-gray-500 hover:text-gray-900 flex flex-row whitespace-nowrap"
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        name="period"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionClick(option)}
                      />
                      {option}
                    </label>
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};
