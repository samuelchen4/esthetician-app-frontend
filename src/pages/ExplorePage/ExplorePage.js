import React, { useState, useEffect } from "react";
import api from "src/api/api-config";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
// import ClientCard from '../components/ClientCard';
import ClientCard from "src/components/ClientCard/ClientCard";
import Modal from "src/components/Modal";
import categories from "src/constants/categories";
import { cn } from "src/lib/utils";
import { Button } from "src/components/ui/button";
import { Calendar } from "src/components/ui/calendar";
import { ClientCardSkeleton } from "src/components/ClientCardSkeleton";
import useUserStore from "src/stores/useUserStore";
import { useUser } from "@clerk/clerk-react";
import PageLoader from "src/components/PageLoader";

const headerHeight = "50";

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

// const imagesBotox = [
//   "/static/botox-1.jpeg",
//   "/static/botox-2.jpeg",
//   "/static/botox-3.jpeg",
//   "/static/botox-4.jpeg",
// ];

const imagesLashes = [
  "/static/lashes-1.jpeg",
  "/static/lashes-2.jpeg",
  "/static/lashes-3.jpeg",
  "/static/lashes-4.jpeg",
];
const ExplorePage = () => {
  // Clerk
  const clerkObj = useUser();
  console.log(clerkObj);
  const { isLoaded: clerkIsLoaded, isSignedIn, user: clerkUser } = clerkObj;

  // userStore
  const user = useUserStore((state) => state.user);

  const [clientData, setClientData] = useState([]);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [service, setService] = useState("Nails");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleServiceModal = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const handleDatePickerModal = () => {
    setIsDateOpen(!isDateOpen);
  };

  // Close modal when service is selected
  useEffect(() => {
    setIsServiceOpen(false);
  }, [service]);

  // Close modal when date is selected
  useEffect(() => {
    setIsDateOpen(false);
  }, [date]);

  useEffect(() => {
    const fetchClientCardData = async () => {
      const config = {
        params: { service, limit: 3 },
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
  }, [service]);

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
          to={`/client-info/${clientId}`}
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

  if (!clerkIsLoaded || (isSignedIn && user === null))
    return <PageLoader className="fixed inset-x-0 border" />;

  return (
    <div className="flex flex-col text-neutral-600 font-nunito">
      <div id="explore-page-hero" className="relative flex">
        <img src="/static/hero-picture-1.jpg" className="z-0 h-full w-full" />
        <div className="absolute inset-0 z-10 grow bg-gray-700 opacity-60"></div>
        <div className="absolute inset-0 z-20 grow flex flex-col justify-center items-center p-4 text-base text-white tracking-wide">
          <h2 className="font-bold text-2xl mb-2">
            Beauty is Personal – Discover Aestheticians Who Match Your Style!
          </h2>
          <p className="font-semibold text-lg text-blue-100">
            Find the perfect aesthetician, explore their specialties, and
            schedule your next beauty session in just a few clicks
          </p>
        </div>
      </div>
      <div id="page-container" className="mt-5 mx-4 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl text-black font-bold tracking-wide mb-0.5">
            Trending Aetheticians
          </h3>
          <p className="text-gray-400 font-thin text-sm">See All</p>
        </div>
        <p className="mb-1 self-start sm:self-center text-sm text-gray-500">
          Aint no party like a Diddy party! 🔥
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
          <p className="text-gray-400 font-thin text-sm">See All</p>
        </div>
        <p className="mb-1 self-start sm:self-center text-sm text-gray-500">
          Meet the Latest Rising Stars in Aesthetics! 🌟
        </p>
        <div
          id="client-trending-container"
          className="mb-6 flex flex-col pt-4 space-y-6 sm:flex-row sm:flex-wrap sm:space-x-2 sm:justify-center"
        >
          {renderCards()}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
