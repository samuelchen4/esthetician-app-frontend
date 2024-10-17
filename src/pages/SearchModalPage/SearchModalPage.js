import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useMobileNavStore from "src/stores/useMobileNavStore";
import useSearchStore from "src/stores/useSearchStore";
import useDataStore from "src/stores/useDataStore";
import { cn } from "src/lib/utils";
import { MoveLeft } from "lucide-react";
import serviceConstants from "src/constants/categories";
import filterConstants from "src/constants/filters";

const SearchModalPage = ({ className }) => {
  //   dom router
  const navigate = useNavigate();

  // MobileNavStore
  const setIsOpenMobileStore = useMobileNavStore((state) => state.setIsOpen);

  // local
  const selectRef = useRef(null);

  //   SearchStore
  const city = useSearchStore((state) => state.city);
  const setCity = useSearchStore((state) => state.setCity);

  const province = useSearchStore((state) => state.province);
  const setProvince = useSearchStore((state) => state.setProvince);

  const service = useSearchStore((state) => state.service);
  const setService = useSearchStore((state) => state.setService);

  const filter = useSearchStore((state) => state.filter);
  const setFilter = useSearchStore((state) => state.setFilter);

  const setSearchKeyword = useSearchStore((state) => state.setSearchKeyword);

  // dataStore
  const getDataStore = useDataStore((state) => state.getData);

  const submitDataHandler = () => {
    // get lat and long from the browser
    const lat = false || 51.0447;
    const long = false || -114.0719;

    const limit = 10;
    let page = 1;
    // dont await this
    setSearchKeyword(service);
    getDataStore(lat, long, city, province, service, limit, page, filter);
    navigate("/search");
  };

  //   Set the mobile nav component to close when this component is open
  useEffect(() => {
    setIsOpenMobileStore(false);

    return () => {
      // open mobile store on unmount
      setIsOpenMobileStore(true);
    };
  }, []);

  const clickBackButton = () => {
    navigate(-1);
  };

  // handle city and province change
  const handleCityChange = (e) => {
    const value = e.target.value;
    // console.log("value: ", value);

    const regex = /^(\w+(?: \w+)*), (\w+(?: \w+)*)$/;
    const match = value.match(regex);
    // Dont include error handling bc, I am hardcoding the options for city and province
    const city = match[1];
    const province = match[2];

    // console.log("city: ", city);
    // console.log("province: ", province);
    setCity(city);
    setProvince(province);
  };

  // Clears all search params on click
  const clearAllHandler = () => {
    setCity("");
    setProvince("");
    setService("");
    setFilter("");

    // Hacked together way of doing this bc, I dont have value prop binded to select
    if (selectRef.current) {
      selectRef.current.selectedIndex = 0; // Reset the select to the default option
    }
  };

  //   Render service buttons
  const renderServiceButtons = () => {
    //   onClick for buttons
    const handleServiceButtonClick = (e) => {
      console.log("service clicked: ", e.target.name);
      const newService = e.target.name;

      if (service === newService) {
        setService("");
      } else {
        setService(newService);
      }
    };

    const buttons = serviceConstants.map((serviceConstant) => {
      return (
        <button
          name={serviceConstant}
          key={serviceConstant}
          onClick={handleServiceButtonClick}
          className={cn(
            "py-2 px-4 border rounded-lg bg-white text-primary border-primary",
            service === serviceConstant && "bg-primary text-white"
          )}
        >
          {serviceConstant}
        </button>
      );
    });
    return buttons;
  };

  //   Render service buttons
  const renderFilterButtons = () => {
    //   onClick for buttons
    const handleFilterButtonClick = (e) => {
      console.log("filter clicked: ", e.target.name);
      const newFilter = e.target.name;

      if (filter === newFilter) {
        setFilter("");
      } else {
        setFilter(newFilter);
      }
    };

    const buttons = filterConstants.map((filterConstant) => {
      return (
        <button
          name={filterConstant}
          key={filterConstant}
          onClick={handleFilterButtonClick}
          className={cn(
            "py-2 px-4 border rounded-lg bg-white text-primary border-primary",
            filter === filterConstant && "bg-primary text-white"
          )}
        >
          {filterConstant}
        </button>
      );
    });
    return buttons;
  };

  return (
    <div
      className={cn(
        "z-50 flex flex-col p-6 text-neutral-600 font-nunito bg-white text-base",
        className
      )}
    >
      <MoveLeft size="24" className="stroke-black" onClick={clickBackButton} />
      <h3 className="text-3xl text-black font-bold my-10">Find Your Style</h3>
      <div className="flex flex-col space-y-3 mb-10">
        <p className="text-xl font-bold">Where are you?</p>
        {/* Hard code values for dropdown rn, when we expand we can break this out into a seperate */}
        <select
          ref={selectRef}
          onChange={handleCityChange}
          // className='py-2.5 px-4 border border-neutral-400 rounded-xl'
        >
          <option value="" disabled hidden>
            Select a city!
          </option>
          <option value="Calgary, Alberta">Calgary, Alberta</option>
          <option value="Edmonton, Alberta">Edmonton, Alberta</option>
        </select>
      </div>
      <div id="search-services" className="flex flex-col space-y-5 mb-10">
        <p className="text-xl font-bold">What services are you looking for?</p>
        <div className="flex flex-col space-y-4 w-2/5">
          {renderServiceButtons()}
        </div>
      </div>
      <div id="search-filters" className="flex flex-col space-y-5 mb-10">
        <p className="text-xl font-bold">
          Pick your filters
          <span className="ml-2 text-xs">(optional)</span>
        </p>
        <div className="flex flex-col space-y-4 w-2/5">
          {renderFilterButtons()}
        </div>
      </div>
      <div
        id="search-buttons"
        className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 pb-safe-bottom bg-white border-t border-gray-300"
      >
        <p
          className=" underline underline-offset-2 text-sm"
          onClick={clearAllHandler}
        >
          Clear all
        </p>
        {/* <Link to={"/search"}> */}
        <button
          onClick={submitDataHandler}
          className="my-3 w-20 h-10 bg-primary text-white rounded-lg"
        >
          Search
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SearchModalPage;
