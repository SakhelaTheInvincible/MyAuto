import { Container } from "./components/Container";
import { Links } from "./components/Links";
import { Navbar } from "./components/Navbar";
import { Header } from "./components/Header";
import { Cars } from "./components/Cars";
import { SidebarFilters } from "./components/SidebarFilters";
import { useFilterContext } from "./context/FilterContext";
import { useEffect, useState } from "react";
import PageChanger from "./components/PageChanger";
import { Help } from "./components/Help";

function App() {
  const {
    totalPage,
    page,
    setPage,
    gel,
    toggle,
    dealType,
    models,
    minPrice,
    maxPrice,
    period,
    sortOrder,
    rentDaily,
    rentDriver,
    rentPurchase,
    rentInsured,
    categories,
    typeID
  } = useFilterContext();
  const [url, setUrl] = useState<string>(
    "https://api2.myauto.ge/ka/products/?Mans=&PriceFrom=&PriceTo=&Cats=&CurrencyID=&SortOrder=&Period=&Page=1"
  );

  useEffect(() => {
    console.log("app", models);
    const modelsString = Array.from(models.entries())
      .map(([manID, models]) => {
        return `${[manID, ...models].join(".")}`;
      })
      .join("-");
    const minPriceString = minPrice === -1 ? "" : `${minPrice}`;
    const maxPriceString = maxPrice === -1 ? "" : `${maxPrice}`;
    const catsString = categories.join(".");
    const currencyString = gel ? "3" : "1";
    const rentString =
      dealType === 1
        ? `&ForRent=1&RentDaily=${rentDaily ? 1 : ""}&RentDriver=${
            rentDriver ? 1 : ""
          }&RentPurchase=${rentPurchase ? 1 : ""}&RentInsured=${
            rentInsured ? 1 : ""
          }`
        : (dealType !== -1 ? "&ForRent=0": "");
    const periodString = period === "" || !period ? "" : `${period}`;

    setUrl(
      `https://api2.myauto.ge/ka/products/?Mans=${modelsString}&PriceFrom=${minPriceString}&PriceTo=${maxPriceString}&Cats=${catsString}&CurrencyID=${currencyString}&${rentString}&SortOrder=${sortOrder}&Period=${periodString}&Page=${1}&TypeID=${typeID}`
    );
    console.log(
      "G",
      `https://api2.myauto.ge/ka/products/?Mans=${modelsString}&PriceFrom=${minPriceString}&PriceTo=${maxPriceString}&Cats=${catsString}&CurrencyID=${currencyString}&${rentString}&SortOrder=${sortOrder}&Period=${periodString}&Page=${1}&TypeID=${typeID}`
    );
    setPage(1);
  }, [toggle]);

  useEffect(() => {
    const periodString = period === "" || !period ? "" : `${period}`;
    const newUrl = url
      .replace(/(Period=).*?(&|$)/, `$1${periodString}$2`)
      .replace(/(SortOrder=).*?(&|$)/, `$1${sortOrder}$2`)
      .replace(/(Page=).*?(&|$)/, `$1${1}$2`);
    setUrl(newUrl);
    console.log("gg", newUrl);
    setPage(1);
  }, [period, sortOrder]);

  useEffect(() => {
    const pageString = page === 1 ? "" : `${page}`;
    const newUrl = url.replace(/(Page=).*?(&|$)/, `$1${pageString}$2`);
    setUrl(newUrl);
    console.log("gg", newUrl);
  }, [page]);

  return (
    <>
      <Navbar />
      <div className="sm:hidden flex w-full ">
        <Help />
      </div>
      <Container>
        <div className="sm:flex hidden">
          <Links />
        </div>
        <div className="mt-3 flex sm:flex-row sm:justify-between w-full flex-col items-center sm:items-start ">
          <div className="sm:flex hidden w-full flex-grow">
          <SidebarFilters />
            </div>
          <div className="sm:ml-3 m-0 flex flex-col w-full justify-center ">
            <div className="sm:flex hidden">
              <Header />
            </div>
            <Cars url={url} />
            <PageChanger
              currentPage={page}
              goToPage={setPage}
              totalPages={totalPage}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
