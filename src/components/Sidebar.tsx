import { CarIcon, MotoIcon, TractorIcon } from "../assets/Icons";
import { useFilterContext } from "../context/FilterContext";
import { useSelectedContext } from "../context/SelectedContext";
import {useState, useEffect} from 'react'
export const Sidebar = () => {

  const {typeID, setTypeID} = useFilterContext()
  const {setMans, setModelss, setCats, setDealTypee} = useSelectedContext()
  const {parse, setParse} = useFilterContext()
  const [parse2, setParse2] = useState(false)

  const onClick = () => {
    // reset all filters
    setDealTypee(new Map())
    setMans([])
    setModelss(new Map())
    setCats([])
    setParse2(!parse2)
  }

  useEffect(() => {
    setParse(!parse)
  },[parse2])

  return (
    <div className="w-full bg-white rounded-[11px] border border-b-0 border-[#E2E5EB] sidebar overflow-hidden ">
      <div className="grid grid-cols-3">
        <Icon className="border-r hover:bg-white" active={typeID===0} onClick={() => {setTypeID(0); (typeID !== 0 && onClick())}}>
          <CarIcon />
        </Icon>
        <Icon className="border-r hover:bg-white" active={typeID===1} onClick={() => {setTypeID(1); (typeID !== 1 && onClick())}}>
          <TractorIcon />
        </Icon>
        <Icon className="hover:bg-white" active={typeID===2} onClick={() => {setTypeID(2); (typeID !==2 && onClick())}}>
          <MotoIcon />
        </Icon>
      </div>
    </div>
  );
};

const Icon = ({
  children,
  className = "",
  active = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      className={
        `border-b border-[#E9E9F0] py-[14px] flex items-center justify-center 
        ${className}
        ${active ? " border-b-[#FD4100] bg-white" : " bg-[#F9F9FB]"}`
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
};
