import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import { useFilterContext } from "../context/FilterContext";

type myCarType = {
  car_id: number;
  photo: string;
  prod_year: number;
  car_run_km: number;
  price_gel: number;
  price_usd: number;
  engine_volume: number;
  right_wheel: boolean;
  model_id: number;
  location_id: number;
  man_id: number;
  views: number;
  photo_ver: number;
  customs_passed: boolean;
  gear_type_id: number;
  order_date: string;
  fuel_type_id: number;
  forRent: boolean;
  category_id: number;
};

const gearTypeDict: { [key: number]: string } = {
  1: "მექანიკა",
  2: "ავტომატიკა",
  3: "ტრიპტონიკი",
  4: "ვარიატორი",
};

const fuelTypeDict: { [key: number]: string } = {
  2: "ბენზინი",
  3: "დიზელი",
  6: "ჰიბრიდი",
  7: "ელექტრო",
  8: "ბუნებრივი გაზი",
  9: "თხევადი გაზი",
  10: "დატენვადი ჰიბრიდი",
  12: "წყალბადი",
};

// maps man_id to manufacturer name
const manufacturers: Map<number, string> = new Map();
const models = new Map<string, string>();
const cats = new Map<number, string>();

export const Cars = ({ url }: { url: string }) => {
  const [cars, setCars] = useState<myCarType[]>([]); // [
  const { gel, setTotal, setTotalPage } = useFilterContext();

  // fetch the data from the url and leave only relevant data
  useEffect(() => {
    const newCars: myCarType[] = [];
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.data.items.forEach((car: any) => {
          newCars.push({
            car_id: car.car_id,
            photo: car.photo,
            prod_year: car.prod_year,
            car_run_km: car.car_run_km,
            price_gel: car.price_value,
            price_usd: car.price_usd,
            engine_volume: car.engine_volume,
            right_wheel: car.right_wheel,
            model_id: car.model_id,
            location_id: car.location_id,
            man_id: car.man_id,
            views: car.views,
            photo_ver: car.photo_ver,
            customs_passed: car.customs_passed,
            gear_type_id: car.gear_type_id,
            order_date: car.order_date,
            fuel_type_id: car.fuel_type_id,
            forRent: car.for_rent,
            category_id: car.category_id,
          });
        });
        setTotal(data.data.meta.total);
        setTotalPage(data.data.meta.last_page);
      })
      .then(() => {
        setCars(newCars);
      });
  }, [url]);

  useEffect(() => {
    fetch("https://api2.myauto.ge/ka/cats/get")
      .then((res) => res.json())
      .then((data) => {
        data.data.forEach((cat: { category_id: number; title: string }) => {
          cats.set(cat.category_id, cat.title);
        });
      });
  }, []);

  // get picture url
  const getPictureUrl = (photo: string, car_id: number, photo_ver: number) => {
    // https://static.my.ge/myauto/photos/{photo}/large/{car_id}_1.jpg?v={photo_ver}
    return `https://static.my.ge/myauto/photos/${photo}/large/${car_id}_1.jpg?v=${photo_ver}`;
  };

  const getCarName = async (man_id: number, model_id: number) => {
    let man_name: string = "";
    let model_name: string = "";

    if (manufacturers.has(man_id)) {
      man_name = manufacturers.get(man_id) as string;
    } else {
      const res = await fetch("https://static.my.ge/myauto/js/mans.json");
      const data = await res.json();
      for (const element of data) {
        if (element.man_id == man_id) {
          man_name = element.man_name;
          break;
        }
      }
      manufacturers.set(man_id, man_name);
    }

    const modelKey = `${man_id}-${model_id}`;

    if (models.has(modelKey)) {
      model_name = models.get(modelKey) as string;
    } else {
      const res = await fetch(
        `https://api2.myauto.ge/ka/getManModels?man_id=${man_id}`
      );
      const data = await res.json();
      for (const element of data["data"]) {
        if (element.model_id == model_id) {
          model_name = element.model_name;
          break;
        }
      }
      models.set(modelKey, model_name);
    }

    return `${man_name} ${model_name}`;
  };

  const deltTime = (publishDate: string) => {
    const MINUTE = 60000;
    const HOUR = 3600000; // milliseconds in an hour
    const DAY = 24 * HOUR; // milliseconds in a day
    const MONTH = 30 * DAY; // milliseconds in a month
    const YEAR = 12 * MONTH; // milliseconds in a year

    const now = new Date();
    const pubDate = new Date(publishDate);
    const diff = now.getTime() - pubDate.getTime();

    switch (true) {
      case diff < HOUR:
        return Math.floor(diff / MINUTE) + " წუთ";
      case diff < DAY:
        return Math.floor(diff / HOUR) + " საათი";
      case diff < MONTH:
        return Math.floor(diff / DAY) + " დღე";
      case diff < YEAR:
        return Math.floor(diff / MONTH) + " თვე";
      default:
        return Math.floor(diff / YEAR) + " წელი";
    }
  };

  return (
    <div className="am:mb-2 w-full flex flex-col items-center">
      {cars.map((car: myCarType) => (
        <CarCard
          key={car.car_id}
          name={getCarName(car.man_id, car.model_id)}
          year={car.prod_year}
          gearType={gearTypeDict[car.gear_type_id]}
          fuelType={fuelTypeDict[car.fuel_type_id]}
          totalRun={car.car_run_km}
          rightWheel={car.right_wheel}
          price={gel ? car.price_gel : car.price_usd}
          customsPassed={car.customs_passed}
          location={`ადგილი ${car.location_id}`}
          engineVolume={car.engine_volume}
          views={car.views}
          photo={getPictureUrl(car.photo, car.car_id, car.photo_ver)}
          publishedFor={deltTime(car.order_date)}
          forRent={car.forRent}
          category={cats.get(car.category_id) || "სხვა"}
        />
      ))}
    </div>
  );
};
