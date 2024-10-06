import {
  useFilterContext 
} from "../context/FilterContext";

import React, { useEffect, useState } from "react";

import {
  HeartIcon,
  FireIcon,
  GearIcon,
  FuelIcon,
  CompareIcon,
  PencilIcon,
  TotalRunIcon,
  WheelIcon,
  CheckIcon,
  BoxPencil,
  FlagIcon,
  CompareIcon2,
  HeartIcon2,
} from "../assets/Icons";

function CarCard({
  name,
  year,
  gearType,
  fuelType,
  totalRun,
  rightWheel,
  price,
  customsPassed,
  location,
  engineVolume,
  views,
  photo,
  publishedFor,
  forRent,
  category,
}: {
  name: Promise<string>;
  year: number;
  gearType: string;
  fuelType: string;
  totalRun: number;
  rightWheel: boolean;
  price: number;
  customsPassed: boolean;
  location: string;
  engineVolume: number;
  views: number;
  photo: string;
  publishedFor: string;
  forRent: boolean;
  category: string;
}) {
  const [carName, setCarName] = useState("");
  useEffect(() => {
    name.then((res) => setCarName(res));
  }, [name]);

  const {gel} = useFilterContext();
  const words = carName.split(' ').length;

  return (
    <div className="flex bg-white sm:mt-2 relative w-[375px] h-[451px] sm:rounded-[14px] sm:w-[780px] sm:h-[172px] font-Noto font-semibold">
      <div className="hidden sm:inline-block w-[182px] h-[144px] pt-[16px] pl-[16px]">
        <img
          className="object-cover rounded-[8px] w-[182px] h-[144px]"
          src={photo}
          alt="ph"
        ></img>
      </div>
      {forRent && (
        <div className="flex h-[20px] items-center bg-green-600 text-white text-[12px] rounded-md px-[10px] mt-[16px] ml-[16px] tracking-wider">
          ქირავდება
        </div>
      )}
      <div
        className={`${
          forRent ? "ml-[8px]" : "ml-[16px]"
        } inline-block text-[14px] pt-[16px]`}
      >
        {forRent && words>3 ? carName.split(' ').slice(0,3).join(' ') + '...' : carName}
      </div>
      <div className="inline-block ml-[8px] text-gray-400 text-[14px] pt-[16px]">
        {year} წ
      </div>
      <div className="flex top-[47px] sm:top-0 right-0 absolute sm:pt-[17.5px] mr-[17px] ">
        {!customsPassed && (
          <div className="inline-block p-[6px] pl-[8px] pr-[8px] sm:p-0 sm:bg-white bg-red-100 w-[70px] text-center sm:text-end rounded-[6px] text-orange-500 text-[11px] sm:mr-[16px]">
            განბაჟება
          </div>
        )}
        {customsPassed && (
          <div className="flex sm:bg-white bg-green-100 rounded-[6px] sm:mr-[16px] w-[105px] sm:w-[90px] pl-[8px] p-[6px] sm:p-0 items-center">
            <div className="inline-block mr-[6px]">
              <CheckIcon />
            </div>
            <div className="inline-block  text-green-500 text-[11px] w-[55px]">
              განბაჟებული
            </div>
          </div>
        )}
        <div className="hidden sm:flex">
          <div className="inline-block mr-[6px]">
            <FlagIcon />
          </div>
          <div className="inline-block text-gray-400 text-[11px]">
            {location}
          </div>
        </div>
      </div>
      {price > 0 && (
        <div className="flex absolute left-[16px] sm:pr-[16px] sm:top-[55px] sm:right-[0px] top-[45px] sm:justify-end">
          <div className="text-[20px] mr-[4px]">{Math.floor(price).toLocaleString()}</div>
          <div className="inline-block text-[20px] bg-gray-100 rounded-full w-[24px] h-[24px] text-center text-base mt-[3px]">
            {gel ? "₾" : "$"}
          </div>
        </div>
      )}

      {price == 0 && (
        <div className="text-[14px] mr-[4px] flex sm:top-[55px] sm:right-0 pl-[16px] absolute sm:pr-[16px] top-[47px] text-m">
          ფასი შეთანხმებით
        </div>
      )}

      <div className="inline-block sm:hidden w-[358px] h-[256px] pt-[16px] pl-[16px] absolute top-[76px]">
        <img
          className="object-cover rounded-[16px] w-[358px] h-[256px]"
          src={photo}
          alt="ph"
        ></img>
      </div>

      <div className="flex sm:top-[60px] sm:left-[198px] top-[377px] left-[16px] absolute pr-[16px] sm:mt-[3px] sm:items-center">
        <div className="sm:inline-block hidden mr-[12px]">
          <FuelIcon />
        </div>
        <div className="inline-block text-center text-[12px]">
          {engineVolume % 1000 == 0
            ? engineVolume / 1000 + ".0"
            : engineVolume / 1000}{" "}
          {fuelType}
        </div>
      </div>

      <div className="flex sm:top-[90px] sm:left-[198px] left-[16px] top-[397px] absolute pr-[16px] sm:mt-[3px] sm:items-center">
        <div className="sm:inline-block hidden mr-[12px] pl-[2.5px]">
          <GearIcon />
        </div>
        <div className="inline-block text-center text-[12px] sm:mt-[2px] sm:ml-[1.5px]">
          {gearType == "ტრიპტონიკი" ? "ტიპტრონიკი" : gearType}
        </div>
      </div>

      <div className="sm:hidden left-[187px] top-[357px] absolute pr-[16px] inline-block text-center text-[12px]">
        {category}
      </div>

      <div className="flex sm:top-[60px] sm:left-[424px] top-[357px] left-[16px] absolute pr-[16px] sm:mt-[3px] sm:items-center">
        <div className="hidden sm:inline-block mr-[12px]">
          <TotalRunIcon />
        </div>
        <div className="inline-block text-center text-[12px]">
          {totalRun.toLocaleString().replace(',', " ")} კმ
        </div>
      </div>

      <div className="flex sm:top-[90px] sm:left-[424.3px] top-[377px] left-[187px] absolute pr-[16px] sm:mt-[3px] sm:items-center">
        <div className="hidden sm:inline-block mr-[12px]">
          <WheelIcon />
        </div>
        <div className="hidden sm:inline-block text-center text-[12px] sm:mt-[2px]">
          {rightWheel ? "მარჯვენა" : "მარცხენა"}
        </div>
        <div className="inline-block sm:hidden text-center text-[12px] sm:mt-[2px]">
          {rightWheel ? "საჭე მარჯვნივ" : "საჭე მარცხნივ"}
        </div>
      </div>

      <div className="sm:hidden absolute flex top-[397px] left-[187px] h-[18px] items-center">
        <div className="inline-block mr-[6px]">
          <FlagIcon />
        </div>
        <div className="inline-block text-[12px]">{location}</div>
      </div>

      <div className="sm:hidden flex absolute bg-gray-100 top-[420px] h-[2px] w-[375px] "></div>

      <div className="hidden sm:flex top-[142px] left-[198px] absolute text-[12px] text-gray-400">
        {views} ნახვა • {publishedFor}
      </div>

      <div className="flex sm:hidden left-[16px] top-[428px] absolute text-[11px] text-gray-400">
        <div className="w-[11px] h-[14px] flex mr-[10px] items-center">
          <FireIcon />
        </div>
        <div className="">
          {views} ნახვა &nbsp;&nbsp;•&nbsp;&nbsp; {publishedFor}
        </div>
      </div>

      <div className="hidden sm:flex absolute top-[138px] left-[684px] w-[90px] items-center">
        <div className="inline-block mr-[16px]">
          <PencilIcon />
        </div>
        <div className="inline-block mr-[16px]">
          <CompareIcon />
        </div>
        <div className="inline-block">
          <HeartIcon />
        </div>
      </div>

      <div className="sm:hidden flex absolute top-[428px] right-[16px] items-center">
        <div className="mr-[22px]">
          <CompareIcon2 />
        </div>
        <div className="">
          <BoxPencil />
        </div>
      </div>

      <div className="sm:hidden flex absolute top-[107px] right-[32px]"><HeartIcon2 /></div>
    </div>
  );
}
export default CarCard;
