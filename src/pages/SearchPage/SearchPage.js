import React from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import useDataStore from "src/stores/useDataStore";
import { ClientCardSkeleton } from "src/components/ClientCardSkeleton";
import ClientCard from "src/components/ClientCard/ClientCard";

const limit = 10;

const SearchPage = () => {
  // router
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search/search-page");
  };

  // Zustand
  const dataStore = useDataStore((state) => state.data);
  const isDataLoadingStore = useDataStore((state) => state.isLoading);

  // Function that renders card component for information from dataStore
  const renderAetheticianCards = () => {
    if (isDataLoadingStore === true) {
      const skeletons = new Array(3).map((x) => <ClientCardSkeleton />);
      return skeletons;
    } else {
      const cards = dataStore.map((aethetician) => {
        return <ClientCard />;
      });
    }
  };

  // render blocks
  // This function will be in the SearchBlock Carousel component
  // takes in an array of strings, strings are the titles of each block
  const topics = ["Trending, Nearby, Nails, Botox, Lashes, Hair"];

  return (
    <div className="flex flex-col my-4 mb-20 mx-4 text-neutral-600 font-nunito">
      <h3 className="text-3xl text-black font-bold my-6">Aetheticians</h3>
      <div className="flex flex-col space-y-3 mb-10">
        <p className="text-xl font-bold">What are you looking for?</p>

        <button
          onClick={handleSearchClick}
          className="sticky top-5 z-40 py-2 px-4 flex items-center space-x-2 text-left text-base overflow-x-hidden border border-neutral-400 rounded-xl shadow-md"
        >
          <Search size="20" />
          {/* Pull the values from the useSearchStore to generate text here */}
          <p>Calgary, Alberta</p>
        </button>
      </div>
      <div></div>

      {/* search block carousel component */}
      <div
        className="flex flex-col 
      space-y-6"
      >
        {true && (
          <p className="text-base ">
            There are x Aestiticians in y that specialize in z
          </p>
        )}
        <div id="search-row" className="flex space-x-6 h-40">
          <div className="w-4/12 bg-gray-200 p-4  rounded-lg shadow-md">
            <p className="font-bold text-black">Trending</p>
          </div>
          <div className="grow flex bg-gray-200 p-4 rounded-lg shadow-md">
            <p className="font-bold text-black mt-auto">Nearby</p>
          </div>
        </div>
        <div id="search-row" className="flex space-x-6 h-40 ">
          <div className="grow bg-gray-200 rounded-lg shadow-md p-4">
            <p className="font-bold text-black">Nails</p>
          </div>
          <div className="w-4/12 p-4 bg-gray-200 rounded-lg shadow-md">
            <p className="font-bold text-black mt-auto">Lashes</p>
          </div>
        </div>
        <div id="search-row" className="flex space-x-6 h-40 ">
          <div className="w-4/12 p-4 bg-gray-200 rounded-lg shadow-md">
            <p className="font-bold text-black">Hair</p>
          </div>
          <div className="grow p-4 bg-gray-200 rounded-lg shadow-md">
            <p className="font-bold text-black mt-auto">Botox</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
