import React from "react";
import Carousel from "src/components/Carousel";
import { Dot, Heart, Star, StarHalf, Ellipsis } from "lucide-react";

// const images = [
//   "/static/nails-1.png",
//   "/static/nails-2.png",
//   "/static/nails-3.png",
//   "/static/nails-4.png",
//   "/static/nails-5.png",
// ];

const ClientCard = ({
  images,
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
      className="relative w-full max-h-70 flex flex-col border text-xs text-gray-500 border-gray-300 rounded-lg shadow-md font-nunito sm:max-w-[350px]"
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
        {/* <p className="z-10 absolute -bottom-6 right-3 border border-gray-400 p-1.5 rounded-full shadow-sm bg-white text-black">
          <MoveRight size="20" />
        </p> */}
      </div>
      <div className=" relative mx-4 mt-5 mb-4 grow">
        <img
          src="/static/client-card-profile-picture-2.png"
          className="absolute top-[-70px] h-14 border-2 border-black rounded-sm shadow-md object-cover"
        />
        {/* <Ellipsis
          size="24"
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-gray-300"
        /> */}
        <h5 className="mb-0.5 font-bold text-lg ">
          {firstName} {lastName}
        </h5>
        <div className="flex flex-col">
          <div className="flex items-center">
            <p className="text-primary font-semibold">
              {services !== null ? services.join(", ") : "Specialist"}
            </p>
            <Dot size="20" />
            <div className=" flex items-center">
              <Star size="12" className="text-yellow-400" />
              <Star size="12" className="text-yellow-400" />
              <Star size="12" className="text-yellow-400" />
              <StarHalf size="12" className="text-yellow-400" />
              <p className="ml-0.5">(3.4)</p>
            </div>
          </div>
          <p>{!location ? "Calgary, AB" : location}</p>
          {/* <p>Avaliable: Monday, Wednesday, Friday</p> */}
        </div>
        {/* <div className="absolute bottom-0 right-0 flex items-center">
          <Star size="12" className="text-yellow-400" />
          <Star size="12" className="text-yellow-400" />
          <Star size="12" className="text-yellow-400" />
          <StarHalf size="12" className="text-yellow-400" />
          <p className="ml-0.5">(3.4)</p>
        </div> */}
      </div>
    </div>
  );
};

export default ClientCard;
