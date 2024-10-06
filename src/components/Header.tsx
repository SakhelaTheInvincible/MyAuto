import React, { useEffect } from "react";
import { Dropdown } from "./DropdownSort";
import { useFilterContext } from "../context/FilterContext";
export const Header = () => {
  // get filter context
  const {setPeriod, setSortOrder, total} = useFilterContext()

  // tipe options
  const periodDict: { [key: string]: string } = {
    "1 საათი": "1h",
    "3 საათი": "3h",
    "6 საათი": "6h",
    "12 საათი": "12h",
    "1 დღე": "1d",
    "2 დღე": "2d",
    "3 დღე": "3d",
    "1 კვირა": "1w",
    "2 კვირა": "2w",
    "3 კვირა": "3w",
  };

  const periodOptions: string[] = Array.from(Object.keys(periodDict));
  const [periodi, setPeriodi] = React.useState<string>('პერიოდი')

  // dictionary of order by key values. Keys are string and values are int ids
  const orderByDict: { [key: string]: number } = {
    "თარიღი კლებადი": 1,
    "თარიღი ზრდადი": 2,
    "ფასი კლებადი": 3,
    "ფასი ზრდადი": 4,
    "გარბენი კლებადი": 5,
    "გარბენი ზრდადი": 6,
  };
  // keys of the dictionary above
  const orderByOptions: string[] = Object.keys(orderByDict);
  // state of the selected option
  const [orderBy, setOrderBy] = React.useState<string>("თარიღი კლებადი");

  // set period and sort order on change
  useEffect(() => {
    setPeriod(periodDict[periodi])
    setSortOrder(orderByDict[orderBy])
  }, [periodi, orderBy])

  return (
    <div className="flex flex-row justify-between w-full text-center py-[4px] px-1">
      <span className="font-Noto font-bold flex items-center text-sm tracking-wider">
        {total} განცხადება
      </span>
      <div className="flex flex-row">
        <Dropdown options={periodOptions} selectedOption={periodi} onSelectOption={setPeriodi} />
        <Dropdown options={orderByOptions} selectedOption={orderBy} onSelectOption={setOrderBy} />
      </div>
    </div>
  );
};
