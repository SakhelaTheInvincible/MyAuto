import React, { useEffect, useState } from "react";
import { useSelectedContext } from "../context/SelectedContext";
import { Cross } from "../assets/Icons";
import { useFilterContext } from "../context/FilterContext";

export const Help = () => {
  const {
    mans,
    setMans,
    cats,
    setCats,
    modelss,
    setModelss,
    dealType,
    setDealTypee,
  } = useSelectedContext();

  const { minPrice, maxPrice, setMinPrice, setMaxPrice, toggle, setTogle, parse, setParse, gel } =
    useFilterContext();
  const [please, setPlease] = useState(false);

  useEffect(() => {
    setParse(!parse);    
  }, [please]);

  return (
    <div
      className="w-full flex flex-row gap-1 overflow-scroll bg-gray-300 py-4 top px-3"
      id="gg"
    >
      {mans.map((item) => (
        <button
          className="sm:hidden flex bg-white text-gray-800 rounded-3xl pl-px pr-2   justify-center py-1 whitespace-nowrap"
          onClick={() => {
            setMans(mans.filter((option) => option !== item));
            const newModelss = new Map(modelss);
            newModelss.delete(item);
            setModelss(newModelss);
            setPlease(!please);
          }}
        >
          <Cross /> {item}
        </button>
      ))}
      {/* from mdelss map only values */}
      {Array.from(modelss.keys()).map((manufacturer) =>
        modelss.get(manufacturer)?.map((model) => (
          <button
            className="sm:hidden flex bg-white text-gray-800 rounded-3xl pl-px pr-2 justify-center py-1 whitespace-nowrap"
            onClick={() => {
              const newModelss = new Map(modelss);
              newModelss.set(
                manufacturer,
                modelss
                  .get(manufacturer)
                  ?.filter((option) => option !== model) || []
              );
              setModelss(newModelss);
              setPlease(!please);
            }}
          >
            <Cross /> {model}
          </button>
        ))
      )}
      {cats.map((item) => (
        <button
          className="sm:hidden flex bg-white text-gray-800 rounded-3xl pl-px pr-2   justify-center py-1 whitespace-nowrap"
          onClick={() => {
            setCats(cats.filter((option) => option !== item));
            setPlease(!please);
          }}
        >
          <Cross /> {item}
        </button>
      ))}
      {Array.from(dealType.keys()).map((key) => (
        <button
          className="sm:hidden flex bg-white text-gray-800 rounded-3xl pl-px pr-2   justify-center py-1 whitespace-nowrap"
          onClick={() => {
            const newDealType = new Map(dealType);
            newDealType.delete(key);
            setDealTypee(newDealType);
            setPlease(!please);
          }}
        >
          <Cross /> {key}
        </button>
      ))}
      {Array.from(dealType.keys()).map((key) => {
        return dealType.get(key)?.map((item) => (
          <button
            className="sm:hidden flex bg-white text-gray-800 rounded-3xl pl-px pr-2   justify-center py-1 whitespace-nowrap"
            onClick={() => {
              const newDealType = new Map(dealType);
              newDealType.set(
                key,
                dealType.get(key)?.filter((option) => option !== item) || []
              );
              setDealTypee(newDealType);
              setPlease(!please);
            }}
          >
            <Cross /> {item}
          </button>
        ));
      })}
      {minPrice > -1 && (
        <button
          className="sm:hidden flex bg-white text-gray-800 rounded-3xl pl-px pr-2   justify-center py-1 whitespace-nowrap"
          onClick={() => {
            setMinPrice(-1);
            setPlease(!please);
          }}
        >
          <Cross /> ფასი {minPrice}{gel ? "₾" : "$"} დან
        </button>
      )}
      {maxPrice > -1 && (
        <button
          className="sm:hidden flex bg-white text-gray-800 rounded-3xl pl-px pr-2   justify-center py-1 whitespace-nowrap"
          onClick={() => {
            setMaxPrice(-1);
            setPlease(!please);
          }}
        >
          <Cross /> ფასი {maxPrice}{gel ? "₾" : "$"} მდე
        </button>
      )}
    </div>
  );
};
