import React, { useEffect, useState } from "react";
import OutsideClickHandler from "../helper/OutsideClickHandler";
import { compareMaps } from "./DealTypeSelector";
interface Props {
  modelOptions: Map<string, { ind: string[]; group: Map<string, string[]> }>;
  onChoose: (selectedOptions: Map<string, string[]>) => void;
  selectedModels: Map<string, string[]>;
  defaultTitle: string;
  setMans: (mans: string[]) => void;
  mans: string[];
  checkedOptions: Map<string, string[]>;
  setCheckedOptions: (checkedOptions: Map<string, string[]>) => void;
}

export const DropdownModels: React.FC<Props> = ({
  modelOptions,
  onChoose,
  selectedModels,
  defaultTitle,
  setMans,
  mans,
  checkedOptions,
  setCheckedOptions,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState<string>(defaultTitle);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  // generate title
  useEffect(() => {
    const title = [...Array.from(checkedOptions.values()),...Array.from(checkedOptions.keys())].flat().join(", ");
    if (title.length === 0) {
      setTitle(defaultTitle);
    } else {
      setTitle(title);
    }
  }, [checkedOptions]);

  // remove manufacturer from models drop down
  const manCheckboxChange = (manufacturer: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      setMans(mans.filter((man) => man !== manufacturer))
    }
  };

  // on model checkbox change
  const modelCheckboxChange = (manufacturer: string, model: string) => {
    const checkedModels = checkedOptions.get(manufacturer);
    if (checkedModels?.includes(model)) {
      checkedModels.splice(checkedModels.indexOf(model), 1);
    } else {
      checkedModels?.push(model);
    }
    setCheckedOptions(new Map(checkedOptions));
  };

  // on group checkbox change AKA handle adding or removing group of cars
  const groupCheckboxChange = (manufacturer: string, group: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const groupModels = modelOptions.get(manufacturer)?.group.get(group);
    const newCheckedOptions = new Map(checkedOptions);
    const checkedModels = newCheckedOptions.get(manufacturer) ?? [];
    if (isChecked) {
      newCheckedOptions.set(
          manufacturer,
          [
            ...Array.from(new Set([...checkedModels, ...Array.from(groupModels || [])])),
          ].sort()
      );
    } else {
      newCheckedOptions.set(
          manufacturer,
          checkedModels.filter((model) => !groupModels?.includes(model))
      );
    }
    setCheckedOptions(newCheckedOptions);
  };


  const onSubmit = () => {
    onChoose(checkedOptions);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!compareMaps(selectedModels, checkedOptions)) {
      return;
    }
    setCheckedOptions(selectedModels);
  }, [selectedModels]);


  const clearSelection = () => {
    setCheckedOptions(
      mans.reduce((acc, man) => acc.set(man, []), new Map())
    )
  }

  return (
    <OutsideClickHandler onOutsideClick={onSubmit}>
      <div className="relative w-[220px]">
        <button
          onClick={() => setIsOpen(true && modelOptions.size > 0)}
          className={`bg-white shadow-sm border w-[220px] border-gray-300 rounded-md text-left py-2 pl-3 pr-8 ${title === "მოდელები" ? "text-gray-500" : "text-gray-600"} focus:outline-none truncate`}
        >
          {title}
          <div
            className={`absolute top-4 right-4 border-l-2 border-b-2 border-[#6F7383] w-[6px] h-[6px] transition-transform duration-300 -rotate-45 ${
              isOpen ? "transform rotate-[135deg]" : ""
            }`}
          ></div>
        </button>
      </div>
      {isOpen && mans.length > 0 && (
        <div className="absolute mt-2 py-2 bg-white w-[220px]  border rounded-md shadow-lg border-gray-300 z-20 text-gray-400">
          <div className="z-20 max-h-72 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200 scroll-m-1 scrollbar-track-white">
            {Array.from(modelOptions.keys()).map((manufacturer) => (
              <div key={manufacturer} className="w-full ">
                <div className="flex items-center justify-between px-4 py-2 w-full">
                  <div className="flex items-center w-full justify-evenly">
                    <input
                      type="checkbox"
                      className="mr-2 -mt-1 w-4 h-4 checked:border-[#FD4100]"
                      checked={mans.includes(manufacturer)}
                      onChange={(e) => manCheckboxChange(manufacturer, e)}
                    />
                    <span className="text-gray-500 whitespace-nowrap">
                      {manufacturer}
                    </span>
                    <div className="flex-grow border-b-2 border-gray-200 mb-1 mx-2"></div>
                  </div>
                </div>
                {modelOptions.get(manufacturer)?.ind.map((model) => (
                  <div
                    key={model}
                    className="flex items-center px-4 py-2 w-full"
                  >
                    <label className="cursor-pointer hover:text-gray-600">
                      <input
                        type="checkbox"
                        className="mr-2 w-4 h-4 checked:border-[#FD4100]"
                        checked={checkedOptions.get(manufacturer)?.includes(model)}
                        onChange={() => modelCheckboxChange(manufacturer, model)}
                      />
                      <span>{model}</span>
                    </label>
                  </div>
                ))}
                {Array.from(modelOptions.get(manufacturer)?.group.keys() ?? []).map((group) => (
                    <div key={group}>
                      <div className="flex items-center justify-between px-4 py-2 w-full">
                        <label className="cursor-pointer flex flex-row hover:text-gray-600">
                        <input
                            type="checkbox"
                            className="mr-2 mt-[1px] w-4 h-4 checked:border-[#FD4100]"
                            checked={
                              modelOptions.has(manufacturer) ? modelOptions.get(manufacturer)!.group.get(group)!.every((model) => checkedOptions.get(manufacturer)?.includes(model)) : false
                            }
                            onChange={(e) => groupCheckboxChange(manufacturer, group, e)}
                        />
                        <div className="text-gray-400 hover:text-gray-600 whitespace-nowrap">{group}</div>
                        </label>
                        <div className="flex-grow border-gray-300 mx-2">
                          <button
                              onClick={() => {
                                if (expandedGroups.includes(group)) {
                                  setExpandedGroups(expandedGroups.filter((g) => g !== group));
                                } else {
                                  setExpandedGroups([...expandedGroups, group]);
                                }
                              }
                              }
                              className="focus:outline-none w-full flex flex-row justify-end"
                          >
                            <div
                                className={`border-l-2 border-b-2 border-[#6F7383] w-[6px] h-[6px] transition-transform duration-300 -rotate-45 ${
                                  expandedGroups.includes(group) ? "transform rotate-[135deg]" : ""
                                }`}
                            ></div>
                          </button>
                        </div>
                      </div>
                      <div className="ml-6 -pl-1 -pb-2 border-l border-gray-300">

                      { expandedGroups.includes(group) &&
                        modelOptions.get(manufacturer)?.group.get(group)?.map((model) => (
                            <div key={model} className="flex items-center px-4 py-2 w-full">
                              <label className="cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 checked:border-[#FD4100]"
                                    checked={
                                        checkedOptions.has(manufacturer) &&
                                        checkedOptions.get(manufacturer)?.includes(model)
                                    }
                                    onChange={() => modelCheckboxChange(manufacturer, model)}
                                />
                                <span>{model}</span>
                              </label>
                            </div>
                        ))

                      }
                      </div>
                    </div>
                ))}

              </div>
            ))}
          </div>
          {(checkedOptions.size > 0 || selectedModels.size > 0) && (
            <div className="flex flex-row text-s my-2 justify-around mb-[-2px]">
              <button
                onClick={clearSelection}
                className=" text-gray-700 py-2 px-1 text-left text-sm"
              >
                გასუფთავება
              </button>
              <button
                onClick={onSubmit}
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
