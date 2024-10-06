import React, { useEffect, useState } from "react";
import OutsideClickHandler from "../helper/OutsideClickHandler";
import { useFilterContext } from "../context/FilterContext";

const aditionalDealTypes = ["დღიურად", "მძღოლით", "შესყიდვით", "დაზღვევით"];
const dealTypeDict: Map<string, string[]> = new Map([
  ["იყიდება", []],
  ["ქირავდება", aditionalDealTypes],
]);

export function compareMaps(
  map1: Map<string, string[]>,
  map2: Map<string, string[]>
) {
  // Check if the maps have the same size
  if (map1.size !== map2.size) {
    // If not, they are not equal, so return true
    return true;
  }
  // Loop through the entries of map1
  for (let [key, value] of map1) {
    // Check if map2 has the same key
    if (!map2.has(key)) {
      // If not, they are not equal, so return true
      return true;
    }
    // Check if the values are arrays
    if (Array.isArray(value) && Array.isArray(map2.get(key))) {
      // If they are, compare them using JSON.stringify
      if (JSON.stringify(value) !== JSON.stringify(map2.get(key))) {
        // If they are not equal, return true
        return true;
      }
    } else {
      // If they are not arrays, compare them using ===
      if (value !== map2.get(key)) {
        // If they are not equal, return true
        return true;
      }
    }
  }
  // If the loop finishes without returning, the maps are equal, so return false
  return false;
}

export const DealTypeSelector = ({
  dealType,
  setDealTypee,
}: {
  dealType: Map<string, string[]>;
  setDealTypee: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("გარიგების ტიპი");
  const [selected, setSelected] = useState(new Map<string, string[]>());
  const [justDeleted, setJustDeleted] = useState(false);
  const {
    setRentDaily,
    setRentDriver,
    setRentPurchase,
    setRentInsured,
    setDealType,
  } = useFilterContext();

  useEffect(() => {
    // check if they are equal element wise
    if (!compareMaps(dealType, selected)) {
      return;
    }
    setDealTypee(selected);
  }, [selected]);

  useEffect(() => {
    // check if they are allready equal
    if (!compareMaps(dealType, selected)) {
      return;
    }
    setSelected(dealType);
  }, [dealType]);

  useEffect(() => {
    if (selected.has("იყიდება")) {
      setDealType(0);
    } else if (selected.has("ქირავდება")) {
      setDealType(1);
      for (const type of aditionalDealTypes) {
        if (selected.get("ქირავდება")?.includes(type)) {
          switch (type) {
            case "დღიურად":
              setRentDaily(true);
              break;
            case "მძღოლით":
              setRentDriver(true);
              break;
            case "შესყიდვით":
              setRentPurchase(true);
              break;
            case "დაზღვევით":
              setRentInsured(true);
              break;
          }
        } else {
          switch (type) {
            case "დღიურად":
              setRentDaily(false);
              break;
            case "მძღოლით":
              setRentDriver(false);
              break;
            case "შესყიდვით":
              setRentPurchase(false);
              break;
            case "დაზღვევით":
              setRentInsured(false);
              break;
          }
        }
      }
    } else {
      setDealType(-1);
    }

    let newTitle = [
      ...Array.from(selected.keys()),
      ...Array.from(selected.values()),
    ].join(", ");
    if (newTitle.length > 0) {
      newTitle = newTitle.replace(/\s+$/gm, "");
      if (newTitle[newTitle.length - 1] === ",") {
        setTitle(newTitle.slice(0, newTitle.length - 1));
      } else {
        setTitle(newTitle);
      }
    } else {
      setTitle("გარიგების ტიპი");
    }
    // add values to title from selected
  }, [selected]);

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative w-[220px] ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          // className={`bg-white shadow-sm border w-[220px] border-gray-300 rounded-md text-left py-2 pl-3 pr-8 focus:outline-none truncate ${
          //   "გარიგების ტიპი" !== title ? "text-gray-600" : " text-gray-400"
          // }}`}
          className={`bg-white shadow-sm border w-[220px] border-gray-300 rounded-md text-left py-2 pl-3 pr-8 ${(title.trim() !== "გარიგების ტიპი") && "text-gray-800"} focus:outline-none truncate  text-gray-500 }`}
        >
          {title}
          <div
            className={`absolute top-4 right-4 border-l-2 border-b-2 border-[#6F7383] w-[6px] h-[6px] transition-transform duration-300 -rotate-45 ${
              isOpen ? "transform rotate-[135deg]" : ""
            }`}
          ></div>
        </button>
      </div>
      {isOpen && (
        <div className="absolute mt-2 py-2 bg-white w-[220px]  border rounded-md shadow-xl border-gray-300 z-20 text-gray-400">
          <div className="z-20 max-h-72 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200 scroll-m-1 scrollbar-track-white py-2 -mb-2">
            {Array.from(dealTypeDict.keys()).map((key) => (
              <div className="flex items-start px-4 w-full justify-center mb-3 flex-col">
                <div className="flex items-center cursor-pointer">
                  <label className="flex items-center cursor-pointer  hover:text-gray-600">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2 checked:bg-[#FD4100]"
                      checked={selected.has(key) && selected.size === 1}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          const selectedOp = new Map(selected);
                          selectedOp.clear();
                          selectedOp.set(key, []);
                          setSelected(selectedOp);
                        } else {
                          const selectedOp = new Map(selected);
                          selectedOp.delete(key);
                          setSelected(selectedOp);
                        }
                      }}
                    />
                    <span>{key}</span>
                  </label>
                </div>
                <div
                  className={`w-full border-l  pl-3 ml-1 gap-2 flex flex-col  ${
                    (dealTypeDict.get(key) || []).length > 0 && "mt-2"
                  }`}
                >
                  {dealTypeDict.get(key)?.map((item) => (
                    <div className="flex items-center cursor-pointer">
                      <label className="flex items-center cursor-pointer  hover:text-gray-600">
                        <input
                          type="checkbox"
                          className="w-4 h-4 mr-2 checked:bg-[#FD4100]"
                          checked={
                            selected.has(key) &&
                            selected.get(key)?.includes(item)
                          }
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              const selectedOp = new Map(selected);
                              selectedOp.set(key, [
                                ...(selectedOp.get(key) || []),
                                item,
                              ]);
                              setSelected(selectedOp);
                            } else {
                              const selectedOp = new Map(selected);
                              selectedOp.set(
                                key,
                                selectedOp
                                  .get(key)
                                  ?.filter((i) => i !== item) || []
                              );
                              setSelected(selectedOp);
                            }
                          }}
                        />
                        <span>{item}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {(selected.size > 0 || justDeleted) && (
            <div className="flex flex-row text-s my-2 justify-around mb-[-2px]">
              <button
                onClick={() => {
                  setJustDeleted(true);
                  setSelected(new Map<string, string[]>());
                }}
                className=" text-gray-700 py-2 px-1 text-left text-sm"
              >
                გასუფთავება
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setJustDeleted(false);
                }}
                className=" py-2 px-4 rounded-md text-center text-white bg-[#FD4100] "
              >
                არჩევა
              </button>
            </div>
          )}
        </div>
      )}
    </OutsideClickHandler>
  );
};
