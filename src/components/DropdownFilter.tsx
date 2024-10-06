import React, { useEffect, useState } from "react";
import OutsideClickHandler from "../helper/OutsideClickHandler";
import { useFilterContext } from "../context/FilterContext";

interface DropdownProps {
  selectedOption: string[];
  options: string[];
  onChoose: (selectedOptions: string[]) => void;
  defaultOption: string;
  handleSubmit: () => Promise<void>;
}

const DropdownFilter: React.FC<DropdownProps> = ({
  selectedOption,
  options,
  onChoose,
  defaultOption,
  handleSubmit
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedOptions, setCheckedOptions] =
    useState<string[]>(selectedOption);
  const [tik, setTik] = useState(false);

  const handleOptionChange = (option: string) => {
    const isChecked = checkedOptions.includes(option);
    let newOptions: string[] = [];

    if (isChecked) {
      newOptions = checkedOptions.filter((item) => item !== option);
    } else {
      newOptions = [...checkedOptions, option];
    }

    setCheckedOptions(newOptions);
  };

  useEffect(() => {
    if (selectedOption.length !== checkedOptions.length) {
      setCheckedOptions(selectedOption);
    }
  }, [selectedOption]);

  useEffect(() => {

    handleSubmit();
  }, [tik]);

  const handleChoose = () => {
    onChoose(checkedOptions);
    setIsOpen(false);
  };

  return (
    <>
      <div className="hidden sm:block">
        <OutsideClickHandler onOutsideClick={handleChoose}>
          <div className="relative">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-white shadow-sm border w-[220px] border-gray-300 rounded-md text-left py-2 pl-3 pr-8 text-gray-700 focus:outline-none truncate"
            >
              {selectedOption.length > 0 ? (
                selectedOption.join(", ")
              ) : (
                <span className="text-gray-500">{defaultOption}</span>
              )}
              <div
                className={`absolute top-4 right-4 border-l-2 border-b-2 border-[#6F7383] w-[6px] h-[6px] transition-transform duration-300 -rotate-45 ${
                  isOpen ? "transform rotate-[135deg]" : ""
                }`}
              ></div>
            </button>

            {isOpen && (
              <div className="absolute mt-2 py-2 bg-white w-auto  border rounded-md shadow-lg border-gray-300 z-20">
                <ul className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scroll-m-1 scrollbar-track-white">
                  {options.map((option) => (
                    <li key={option} className="flex items-center px-4 py-2">
                      <label
                        htmlFor={option}
                        className="flex items-center cursor-pointer text-gray-500 hover:text-gray-900"
                      >
                        <input
                          type="checkbox"
                          id={option}
                          checked={checkedOptions.includes(option)}
                          onChange={() => handleOptionChange(option)}
                          className="-mt-1 w-4 h-4 checked:border-[#FD4100]"
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>

                {(checkedOptions.length > 0 || selectedOption.length > 0) && (
                  <div className="flex flex-row text-s my-2 justify-around mb-[-2px]">
                    <button
                      onClick={() => setCheckedOptions([])}
                      className=" text-gray-700 py-2 px-1 text-left text-sm"
                    >
                      გასუფთავება
                    </button>
                    <button
                      onClick={handleChoose}
                      className=" py-2 px-4 rounded-md text-center text-white bg-[#FD4100] "
                    >
                      არჩევა
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
      {checkedOptions.length > 0 &&
        checkedOptions.map((item) => (
          <div>
            <button className="sm:hidden flex bg-gray-200 text-gray-700 rounded-xl px-2 -pb-px align-middle justify-center pt-1 whitespace-nowrap" onClick={() => {
              onChoose(checkedOptions.filter((option) => option !== item));
              setTik(!tik);
            }
              }>X {item}</button>
          </div>
        ))}
    </>
  );
};

export default DropdownFilter;
