import React from "react";
import CircleImage from "src/components/CircleImage";
import Carousel from "src/components/Carousel";
import { Button } from "src/components/ui/button";
import { Heart } from "lucide-react";

const images = [
  "/static/nails-1.png",
  "/static/nails-2.png",
  "/static/nails-3.png",
  "/static/nails-4.png",
  "/static/nails-5.png",
];

const ClientCard = ({
  firstName,
  lastName,
  userStory,
  location,
  city,
  province,
  services,
  schedules,
  picture,
}) => {
  return (
    <div
      id="card-container"
      className="relative w-full max-h-70 flex flex-col border text-gray-700 border-gray-400 rounded-lg shadow-md sm:max-w-[350px]"
    >
      <button className="z-10 absolute top-3 right-3 border border-gray-400 p-1.5 rounded-full shadow-sm bg-white text-black">
        <Heart size="20" />
      </button>
      <div className="relative">
        <Carousel
          state={images}
          width={150}
          className="px-0 py-0 rounded-t-lg"
          //   imageClassName="border-2 rounded-lg border-black"
        />
        {/* <CircleImage
          size={60}
          src="/static/client-card-profile-picture-2.png"
          className="absolute bottom-[-10px] left-4 border-2 border-black shadow-sm"
        /> */}
      </div>
      <div className=" relative mx-4 mt-5 mb-4 grow text-sm">
        <img
          src="/static/client-card-profile-picture-2.png"
          className="absolute top-[-70px] h-14 border-2 border-black rounded-sm shadow-md object-cover"
        />
        {/* <CircleImage
          size={70}
          src="/static/client-card-profile-picture-2.png"
          className="absolute top-[-70px] border-2 border-black shadow-sm"
        /> */}
        <h5 className="mb-0.5 font-semibold text-lg">
          {firstName} {lastName}
        </h5>
        <div className="flex flex-col ">
          <p className="text-blue-500">
            {services !== null ? services.join(", ") : "Specialist"}
          </p>
          <p>{!location ? "Calgary, AB" : location}</p>
          {/* {schedules.length > 0 && <p>Avaliability: {schedules.join(" ")}</p>} */}
        </div>
        {/* <Button className="absolute bottom-0 right-0 border rounded-md px-2 py-1 bg-blue-200">
          Book Now
        </Button> */}
      </div>
    </div>
  );
};

export default ClientCard;
