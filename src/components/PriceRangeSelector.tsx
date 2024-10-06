import { useState } from "react";
import { useFilterContext } from "../context/FilterContext";

interface PriceRangeSelectorProps {}
export const PriceRangeSelector = ({}: PriceRangeSelectorProps) => {
  const { setGel, gel, minPrice, maxPrice, setMaxPrice, setMinPrice } =
    useFilterContext();

  // Define a state variable to store the position of the black circle
  const [circlePosition, setCirclePosition] = useState("left");

  // Define a function to toggle the circle position and the currency
  const toggleCurrency = () => {
    setGel(!gel);
    setCirclePosition(circlePosition === "left" ? "right" : "left");
  };

  return (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="text-sm text-gray-500">ფასი</div>

          <button
            onClick={toggleCurrency}
            className="border border-gray-600 rounded-2xl w-16 h-7 relative text-xl flex flex-row justify-between px-[6px] pt-[2px]"
          >
            <span
              className={`text-xl transition-colors duration-300 ${
                gel ? "text-white" : "text-gray-500"
              } z-10`}
            >
              ₾
            </span>
            <span
              className={`text-xl transition-colors duration-300 ${
                gel ? "text-gray-500" : "text-white"
              } z-10`}
            >
              $
            </span>
            <div
              className={`shadow-black shadow-sm absolute -top-[5px] h-9 w-9 rounded-full bg-black transition-transform duration-300 ${
                gel ? "-translate-x-[9px]" : "translate-x-[27px]"
              }`}
            ></div>
          </button>
        </div>
        <div className="flex flex-row items-center justify-between w-full mt-4">
          <div className="flex flex-row items-center ">
            <input
              className="w-24 h-9 border border-gray-300 rounded-md text-sm text-gray-500 px-2 focus:outline-none"
              type="text"
              placeholder="დან"
              // on change if not an number set to 0 else set to the number
              onChange={(e) => {
                if (e.target.value === "") {
                  setMinPrice(-1);
                } else {
                  setMinPrice(parseInt(e.target.value));
                }
              }}
              value={minPrice === -1 ? "" : minPrice}
            />
          </div>
          <div className="text-sm text-gray-500 mx-1 border-b-2 flex-grow"></div>
          <div className="flex flex-row items-center ">
            <input
              className="w-24 h-9 border border-gray-300 rounded-md text-sm text-gray-500 px-2 focus:outline-none"
              type="text"
              placeholder="მდე"
              onChange={(e) => {
                if (e.target.value === "") {
                  setMaxPrice(-1);
                } else {
                  setMaxPrice(parseInt(e.target.value));
                }
              }}
              value={maxPrice === -1 ? "" : maxPrice}
            />
          </div>
        </div>
      </div>
        
  );
};
