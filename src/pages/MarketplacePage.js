import React, { useState, useEffect } from "react";
import api from "../api/api-config";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
// import ClientCard from '../components/ClientCard';
import ClientCard from "src/components/ClientCard/ClientCard";
import Modal from "../components/Modal";
import categories from "../constants/categories";
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
const MarketplacePage = () => {
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
    <div
      id="page-container"
      className="mt-5 mx-4 flex flex-col text-neutral-600 font-nunito"
    >
      <h2 className="text-center my-5 font-bold text-5xl font-alexandria text-black">
        Explore
        <span className="text-primary block md:inline-block md:ml-4">
          Marketplace
        </span>
      </h2>
      <div
        id="search-container"
        className="text-sm flex mb-5 space-x-2 justify-center sticky z-30 py-2"
        style={{ top: headerHeight ? `${headerHeight}px` : "auto" }}
      >
        <Button
          variant={"outline"}
          onClick={handleDatePickerModal}
          className={cn(
            "dark:none w-[225px] h-[40px] justify-start text-left font-normal rounded-2xl border-gray-500",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
        <Button
          variant={"outline"}
          onClick={handleServiceModal}
          className="h-[40px] font-normal rounded-2xl border-gray-500"
        >
          {service ? service : <span>Pick a service</span>}
          <ChevronDown className="ml-1 w-5 h-auto" />
        </Button>
      </div>
      {isDateOpen && (
        <Modal isOpen={isDateOpen} onClose={handleDatePickerModal}>
          <p className="mb-4 font-bold self-start">Pick a date!</p>
          <Calendar
            mode="single"
            disabled={{ before: new Date() }}
            showOutsideDays={false}
            numberOfMonths={12}
            pagedNavigation
            selected={date}
            onSelect={setDate}
            className="rounded-md w-full overflow-y-scroll no-scrollbar"
          />
        </Modal>
      )}

      {isServiceOpen && (
        <Modal isOpen={isServiceOpen} onClose={handleServiceModal}>
          <p className="mb-4 font-bold self-start">Pick a service!</p>
          <div className="flex flex-wrap space-x-3 items-center">
            {categories.map((category) => (
              <button
                onClick={() => {
                  setService(category);
                }}
                className={cn(
                  "px-4 py-1 my-1.5 rounded-2xl border border-black",
                  service === category &&
                    "disabled bg-black text-white cursor-default"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </Modal>
      )}
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
  );
};

export default MarketplacePage;
