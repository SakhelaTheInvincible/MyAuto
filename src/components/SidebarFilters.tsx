import { useEffect, useState } from "react";
import DropdownFilter from "./DropdownFilter";
import { DealTypeSelector } from "./DealTypeSelector";
import { DropdownModels } from "./DropdownModels";
import { useFilterContext } from "../context/FilterContext";
import { PriceRangeSelector } from "./PriceRangeSelector";
import { Sidebar } from "./Sidebar";
import { useSelectedContext } from "../context/SelectedContext";

const manufacturers: Map<string, number> = new Map();
const categories: Map<string, number> = new Map();
let oldMans: string[] = [];

export const SidebarFilters = () => {
  const {mans, setMans, cats, setCats, modelss, setModelss, dealType, setDealTypee, } = useSelectedContext();
  const {typeID} = useFilterContext();
  const [manOptions, setManOptions] = useState<string[]>([]);

  const [catOptions, setCatOptions] = useState<string[]>([]);

  const [addedMans, setAddedMans] = useState<string[]>([]);
  const [removedMans, setRemovedMans] = useState<string[]>([]);

  const [modelOptions, setModelOptions] = useState<
    Map<string, { ind: string[]; group: Map<string, string[]> }>
  >(new Map());

  const { total, setCategoris, setModels, models, setTogle, toggle, parse} =
    useFilterContext();

  const [checkedModels, setCheckedModels] = useState<Map<string, string[]>>(
    mans.reduce((acc, man) => acc.set(man, []), new Map())
  ); 



  // get manufacturer which user has chose from models as well and not from mans.
  const handleSubmit = async () => {
    const newModels: Map<number, number[]> = new Map();
    console.log("modelss", modelss);
    for (const [manName, modelsList] of Array.from(modelss.entries())) {
      const manID: number = manufacturers.get(manName) || 0;
      if (manID === 0) continue;
      const res = await fetch(
        `https://api2.myauto.ge/ka/getManModels?man_id=${manID}`
      );
      const data = await res.json();
      const modelsID: number[] = [];
      data["data"]?.forEach(
        (item: {
          model_id: number;
          model_name: string;
          model_group: string;
        }) => {
          if (modelsList.includes(item.model_name)) {
            modelsID.push(item.model_id);
          }
        }
      );
      newModels.set(manID, modelsID);
    }
    setModels(newModels);

    const newCats: number[] = [];
    for (const i in cats) {
      newCats.push(categories.get(cats[i]) as number);
    }
    setCategoris(newCats);

    console.log("parsed");
    setTogle(!toggle);
  };

  useEffect(() => {
    handleSubmit();
  }, [parse]);

  // check if new manufacturer added or removed
  useEffect(() => {
    const added = mans.filter((man) => !oldMans.includes(man));
    const removed = oldMans.filter((man) => !mans.includes(man));
    if (added.length > 0) {
      setAddedMans(added);
    }
    if (removed.length > 0) {
      setRemovedMans(removed);
    }
    oldMans = mans;
  }, [mans]);

  // model options got removed
  useEffect(() => {
    if (removedMans.length === 0) return;
    console.log("removedMans", removedMans);
    const newModelOptions = new Map(modelOptions);
    const newCheckedModels = new Map(checkedModels);
    for (const manufacturer of removedMans) {
      newModelOptions.delete(manufacturer);
      newCheckedModels.delete(manufacturer);
    }
    setModelOptions(newModelOptions);
    setCheckedModels(newCheckedModels);
    if (newCheckedModels.size === 0) {
      setModelss(new Map());
    }
    setRemovedMans([]);
  }, [removedMans]);

  // added model options
  useEffect(() => {
    if (addedMans.length === 0) return;
    console.log("addedMans", addedMans);
    const newModelOptions = new Map(modelOptions);
    const newCheckedModels = new Map(checkedModels);
    for (const manufacturer of addedMans) {
      fetch(
        `https://api2.myauto.ge/ka/getManModels?man_id=${manufacturers.get(
          manufacturer
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          const independentModels: string[] = [];
          const modelGroups: Map<string, string[]> = new Map();
          data["data"]?.forEach(
            (item: {
              model_id: number;
              model_name: string;
              model_group: string;
              is_car: boolean;
              is_spec: boolean;
              is_moto: boolean;
            }) => {
            // only add car models if typeID is 0, tractor if typeID is 1, moto if typeID is 2
              if (typeID === 0 && !item.is_car) return;
              if (typeID === 1 && !item.is_spec) return;
              if (typeID === 2 && !item.is_moto) return;
              if (item.model_group === "") {
                independentModels.push(item.model_name);
              } else {
                if (modelGroups.has(item.model_group)) {
                  modelGroups.get(item.model_group)?.push(item.model_name);
                } else {
                  modelGroups.set(item.model_group, [item.model_name]);
                }
              }
            }
          );
          newModelOptions.set(manufacturer, {
            ind: independentModels,
            group: modelGroups,
          });
        });
      newCheckedModels.set(manufacturer, []);
    }
    setCheckedModels(newCheckedModels);
    setModelOptions(newModelOptions);
    setAddedMans([]);
  }, [addedMans]);

  // initialize categories and manufacturers options
  useEffect(() => {
    // delete every entry from manufactureres
    manufacturers.clear();
    categories.clear();
    fetch("https://static.my.ge/myauto/js/mans.json")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item: { man_id: number; man_name: string, is_car: string, is_spec: string, is_moto: string}) => {
          // typeID 0 is car, 1 is tractor, 2 is moto
          if (typeID === 0 && item.is_car === "0") return;
          if (typeID === 1 && item.is_spec === "0") return;
          if (typeID === 2 && item.is_moto === "0") return;
          manufacturers.set(item.man_name, item.man_id);
        });
      })
      .then(() => setManOptions(Array.from(manufacturers.keys())));

    fetch("https://api2.myauto.ge/ka/cats/get")
      .then((res) => res.json())
      .then((data) => {
        data["data"].forEach((item: { category_id: number; title: string, category_type: number }) => {
          if (item.category_type === typeID) {
            categories.set(item.title, item.category_id);
          }
        });
      })
      .then(() => setCatOptions(Array.from(categories.keys())));
  }, [typeID]);

  return (
    <div className="relative h-1/2 items-center bg-white rounded-t-[11px] w-[280px] flex-col  ">
      <div className="pb-3  ">
        <Sidebar />
      </div>
      <div className="flex flex-col gap-4 w-full items-center justify-center">
        <div>
          <div className="mb-1 text-sm  ">გარიგების ტიპი</div>
          <DealTypeSelector dealType={dealType} setDealTypee={setDealTypee} />
        </div>
        <div>
          <div className="mb-1 text-sm  ">მწარმოებელი</div>
          <DropdownFilter
            selectedOption={mans}
            options={manOptions}
            onChoose={setMans}
            defaultOption="ყველა მწარმოებელი"
            handleSubmit={handleSubmit}
          />
        </div>
        <div>
          <div className="mb-1 text-sm  ">მოდელი</div>
          <DropdownModels
            modelOptions={modelOptions}
            selectedModels={modelss}
            onChoose={setModelss}
            defaultTitle={"მოდელები"}
            setMans={setMans}
            mans={mans}
            checkedOptions={checkedModels}
            setCheckedOptions={setCheckedModels}
          />
        </div>
        <div>
          <div className="mb-1 text-sm  ">კატეგორია</div>
          <DropdownFilter
            selectedOption={cats}
            options={catOptions}
            onChoose={setCats}
            defaultOption="ყველა კატეგორია"
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="border-b-gray-200 border-b-2 w-full items-center justify-center"></div>
        <div
          className={
            "w-full flex items-center justify-center px-6 py-3"
          }
        >
          <PriceRangeSelector />
        </div>
      </div>
      <div
        className="sticky flex-col items-center p-4 w-full flex mt-3"
        id={"submit-button-car"}
      >
        <button
          className="bg-[#FD4100] text-white px-4 py-2 rounded-md w-full hover:bg-[#e43a00] transition-colors duration-300"
          onClick={handleSubmit}
        >
          <span className="mr-1">ძებნა</span> {total.toLocaleString("en-US")}
        </button>
      </div>
    </div>
  );
};
