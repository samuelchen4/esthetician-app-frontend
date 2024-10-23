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

const imagesNails = [
  "/static/nails-1.png",
  "/static/nails-2.png",
  "/static/nails-3.png",
  "/static/nails-4.png",
  "/static/nails-5.png",
];

const imagesHair = [
  "/static/hair-1.jpeg",
  "/static/hair-2.jpeg",
  "/static/hair-3.jpeg",
  "/static/hair-4.jpeg",
  "/static/hair-5.jpeg",
];

const imagesLashes = [
  "/static/lashes-1.jpeg",
  "/static/lashes-2.jpeg",
  "/static/lashes-3.jpeg",
  "/static/lashes-4.jpeg",
];
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

  // dataStore
  const getTrendingDataStore = useDataStore((state) => state.getTrendingData);
  const getClosestDataStore = useDataStore((state) => state.getClosestData);

  // local state
  const [clientData, setClientData] = useState([]);

  // dom router
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search/search-page");
  };

  const handleTrendingSeeAll = () => {
    setSearchKeyword("Trending");
    getTrendingDataStore(lat, long, city, province, limit, page);
    navigate("/search");
  };

  const handleClosestSeeAll = () => {
    setSearchKeyword("Nearby");
    getClosestDataStore(lat, long, city, province, limit, page);
    navigate("/search");
  };

  // Close modal when service is selected
  useEffect(() => {
    const fetchClientCardData = async () => {
      const config = {
        params: { service: "Lashes", limit: 3 },
      };

      try {
        const { data } = await api.get(
          "/api/marketplace/client-search",
          config
        );
        // console.log('api call completed!');
        // console.log(data.data);
        setClientData(data.data);
        // setClientData([data.data[0]]); // Testing to get one card
      } catch (error) {
        console.error("Error fetching client data", error);
      }
    };

    fetchClientCardData();
  }, []);

  // Renders the cards when the state changes
  // array of objects
  const renderCards = () => {
    // if loading, display skeleton
    if (clientData.length === 0) {
      return new Array(10).fill(null).map((item) => <ClientCardSkeleton />);
    }

    const clientCards = clientData.map((clientObj, index) => {
      // Remove this later, just for testing
      const imagesUpdated = [];
      let profilePicture;
      switch (index % 3) {
        case 0:
          imagesUpdated.push(...imagesNails);
          profilePicture = "/static/client-card-profile-picture.png";
          break;
        case 1:
          imagesUpdated.push(...imagesHair);
          profilePicture = "/static/client-card-profile-picture-2.png";
          break;
        case 2:
          imagesUpdated.push(...imagesLashes);
          profilePicture = "/static/client-card-profile-picture-3.png";

          break;
        default:
          imagesUpdated.push(...imagesNails);
      }

      const {
        _id: clientId,
        first_name: firstName,
        last_name: lastName,
        user_story: userStory,
        location,
        city,
        province,
        services,
        schedules,
        profile_picture,
      } = clientObj;
      return (
        <Link
          to={`/aestheticians/${clientId}`}
          state={{
            clientId,
            firstName,
            lastName,
            userStory,
            services,
            schedules,
            profile_picture,
          }}
        >
          <ClientCard
            images={imagesUpdated}
            profilePicture={profilePicture}
            firstName={firstName}
            lastName={lastName}
            userStory={userStory}
            services={services}
            location={location}
            city={city}
            province={province}
            schedules={schedules}
            picture={profile_picture}
          />
        </Link>
      );
    });
    return clientCards;
  };

  // if (!clerkIsLoaded || (isSignedIn && user === null))
  //   return <PageLoader className='fixed inset-x-0 border' />;

  return (
    <div className=" flex flex-col text-neutral-600 font-nunito">
      <div id="explore-page-hero" className="relative flex">
        <img
          src="/static/hero-picture-6.jpg"
          className="z-0 w-full object-cover rounded-sm"
        />
        <div className="absolute inset-0 z-10 grow bg-black opacity-60"></div>
        <div className="absolute inset-0 z-20 grow flex flex-col justify-center items-start p-4 text-base text-white tracking-wider">
          {/* <img
            src='/static/beauty_connect_logo_2_compressed.png'
            className='h-10 mb-1'
          /> */}
          <h2 className="font-bold text-4xl text-white font-lora mb-1">
            Beauty is
          </h2>
          <h2 className="font-bold text-4xl text-white mb-2 font-lora">
            Personal
          </h2>
          <p className="font-semibold mb-5">Find Your Expert</p>
          <button
            onClick={handleSearchClick}
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
          <p className="text-gray-400 text-sm" onClick={handleTrendingSeeAll}>
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
          {renderCards()}
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-2xl text-black font-bold tracking-wide mb-0.5">
            Up-And-Comers
          </h3>
          <p className="text-gray-400 text-sm" onClick={handleClosestSeeAll}>
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
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
