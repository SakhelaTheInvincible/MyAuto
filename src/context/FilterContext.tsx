import React, { useState } from "react";

type FilterContextType = {
  // forRent 0-for rent and 1-for sale
  dealType: number;
  rentDaily: boolean;
  rentDriver: boolean;
  rentPurchase: boolean;
  rentInsured: boolean;
  // manufacturers list of id numbers
  manufacturers: number[];
  // models list of id numbers
  models: Map<number, number[]>;
  // categoris list of id numbers
  categories: number[];
  // min price
  minPrice: number;
  // max price
  maxPrice: number;
  // period 1h, 2h, 3h, 1d, 2d, 3d, 1w, 2w, 3w
  period: string;
  // sort order 1,2,3,4,5,6
  sortOrder: number;
  // price type
  gel: boolean;
  // total cars
  total: number;
  toggle: boolean;
  page: number;
  totalPage: number;
  parse:boolean;
  typeID: number;
  setTypeID: (typeID: number) => void;
  setParse: (parse: boolean) => void;
  // set functions
  setTotalPage: (totalPage: number) => void;
  setPage : (page: number) => void;
  setDealType: (dealType: number) => void;
  setCategoris: (categories: number[]) => void;
  setRentDaily: (rentDaily: boolean) => void;
  setRentDriver: (rentDriver: boolean) => void;
  setRentPurchase: (rentPurchase: boolean) => void;
  setRentInsured: (rentInsured: boolean) => void;
  setManufacturers: (manufacturers: number[]) => void;
  setModels: (models: Map<number, number[]>) => void;
  setMinPrice: (minPrice: number) => void;
  setMaxPrice: (maxPrice: number) => void;
  setPeriod: (period: string) => void;
  setSortOrder: (sortOrder: number) => void;
  setGel: (gel: boolean) => void;
  setTotal: (total: number) => void;
  setTogle: (togle: boolean) => void;

};

const FilterContext = React.createContext<FilterContextType>(
  {} as FilterContextType
);

export const FilterContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dealType, setDealType] = useState<number>(0);
  const [manufacturers, setManufacturers] = useState<number[]>([]);
  const [models, setModels] = useState<Map<number, number[]>>(new Map<number, number[]>());
  const [minPrice, setMinPrice] = useState<number>(-1);
  const [maxPrice, setMaxPrice] = useState<number>(-1);
  const [period, setPeriod] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [gel, setGel] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [rentDaily, setRentDaily] = useState<boolean>(false);
  const [rentDriver, setRentDriver] = useState<boolean>(false);
  const [rentPurchase, setRentPurchase] = useState<boolean>(false);
  const [rentInsured, setRentInsured] = useState<boolean>(false);
  const [categories, setCategoris] = useState<number[]>([]);
  const [toggle, setTogle] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [parse, setParse] = useState<boolean>(false);
  const [typeID, setTypeID] = useState<number>(0);


  return (
    <FilterContext.Provider
      value={{
        page,
        setPage,
        toggle,
        categories,
        dealType,
        rentDaily,
        rentDriver,
        rentPurchase,
        rentInsured,
        manufacturers,
        models,
        minPrice,
        maxPrice,
        period,
        sortOrder,
        gel,
        total,
        totalPage,
        parse,
        typeID,
        setTypeID,
        setParse,
        setTotalPage,
        setTogle,
        setCategoris,
        setDealType,
        setManufacturers,
        setModels,
        setMinPrice,
        setMaxPrice,
        setPeriod,
        setSortOrder,
        setGel,
        setTotal,
        setRentDaily,
        setRentDriver,
        setRentPurchase,
        setRentInsured,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;

export const useFilterContext = () => {
  return React.useContext(FilterContext);
};
