import React, { useState, useEffect } from "react";
import api from "src/api/api-config";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import ClientCard from "src/components/ClientCard/ClientCard";
import { ClientCardSkeleton } from "src/components/ClientCardSkeleton";
import useUserStore from "src/stores/useUserStore";
import useDataStore from "src/stores/useDataStore";
import useSearchStore from "src/stores/useSearchStore";
import { useUser } from "@clerk/clerk-react";
import PageLoader from "src/components/PageLoader";
import { useRouter } from "src/hooks/useRouter";
import { useData } from "src/hooks/useData";

const ExplorePage = () => {
  // userStore
  const user = useUserStore((state) => state.user);

  // searchStore
  const city = useSearchStore((state) => state.city);
  const province = useSearchStore((state) => state.province);
  const service = useSearchStore((state) => state.service);
  const filter = useSearchStore((state) => state.filter);
  const lat = useSearchStore((state) => state.lat);
  const long = useSearchStore((state) => state.long);
  const limit = useSearchStore((state) => state.limit);
  const page = useSearchStore((state) => state.page);
  const setSearchKeyword = useSearchStore((state) => state.setSearchKeyword);

  // dom router
  const navigate = useNavigate();

  const { trendingAestheticians, upAndComingAestheticians } = useData();

  // const handleSearchClick = () => {
  //   navigate("/search/search-page");
  // };

  // const handleTrendingSeeAll = () => {
  //   setSearchKeyword("Trending");
  //   getTrendingDataStore(lat, long, city, province, limit, page);
  //   navigate("/search");
  // };

  // const handleClosestSeeAll = () => {
  //   setSearchKeyword("Nearby");
  //   getClosestDataStore(lat, long, city, province, limit, page);
  //   navigate("/search");
  // };

  //  takes an array of objects type client
  const renderCards = (data) => {
    // if loading, display skeleton
    if (data.length === 0) {
      return new Array(3).fill(null).map((_) => <ClientCardSkeleton />);
    }

    const cards = data.map((aethetician) => {
      return (
        <ClientCard
          key={aethetician._id}
          aestheticianId={aethetician._id}
          profilePicture={aethetician.profile_picture}
          firstName={aethetician.first_name}
          lastName={aethetician.last_name}
          userStory={aethetician.user_story}
          services={aethetician.services}
          location={aethetician.address}
          city={aethetician.city}
          province={aethetician.province}
          postalCode={aethetician.postal_code}
          rating={aethetician.rating}
          latitude={aethetician.latitude}
          longitude={aethetician.longitude}
          distance={aethetician.distance}
          photos={aethetician.photos}
        />
      );
    });
    return cards;
  };

  // if (!clerkIsLoaded || (isSignedIn && user === null))
  //   return <PageLoader className='fixed inset-x-0 border' />;

  return (
    <div className=" flex flex-col text-neutral-600 font-nunito">
      <div id="explore-page-hero" className="relative flex">
        <img
          src="/static/hero-picture-6.jpg"
          className="z-0 h-64 w-full object-cover rounded-sm"
        />
        <div className="absolute inset-0 z-10 grow bg-black opacity-60"></div>
        <div className="absolute inset-0 z-20 grow flex flex-col justify-center items-start p-4 text-base text-white tracking-wider">
          <h2 className="font-bold text-4xl text-white font-lora mb-1">
            Beauty is
          </h2>
          <h2 className="font-bold text-4xl text-white mb-2 font-lora">
            Personal
          </h2>
          <p className="font-semibold mb-5">Find Your Expert</p>
          <button
            // onClick={handleSearchClick}
            className="flex items-center space-x-2 mx-auto border rounded-full py-3 px-4 shadow-xl text-black bg-white border-black "
          >
            <Search size="20" />
            <p>Search for a service or aethetician</p>
          </button>
        </div>
      </div>
      <div id="page-container" className="mt-5 mx-4 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl text-black font-bold tracking-wide mb-0.5">
            Trending
          </h3>
          <p
            className="text-gray-400 text-sm"
            //  onClick={handleTrendingSeeAll}
          >
            See All
          </p>
        </div>
        <p className="mb-1 self-start sm:self-center text-sm text-gray-500">
          Discover popular aestheticians in your area! 🔥
        </p>
        <div
          id="client-trending-container"
          className="mb-6 flex flex-col pt-4 space-y-6 sm:flex-row sm:flex-wrap sm:space-x-2 sm:justify-center sm:items-center"
        >
          {renderCards(trendingAestheticians)}
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl text-black font-bold tracking-wide mb-0.5">
            Up-And-Comers
          </h3>
          <p
            className="text-gray-400 text-sm"
            //  onClick={handleClosestSeeAll}
          >
            See All
          </p>
        </div>
        <p className="mb-1 self-start sm:self-center text-sm text-gray-500">
          Meet the Latest Rising Stars in Aesthetics! 🌟
        </p>
        <div
          id="client-trending-container"
          className="mb-20 flex flex-col pt-4 space-y-6 sm:flex-row sm:flex-wrap sm:space-x-2 sm:justify-center"
        >
          {renderCards(upAndComingAestheticians)}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
