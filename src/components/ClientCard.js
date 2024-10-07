import React from "react";
import CircleImage from "src/components/CircleImage";
import Carousel from "src/components/Carousel";

const images = [
  "/static/client-card-title-picture-1.png",
  "/static/client-card-title-picture-2.png",
  "/static/client-card-profile-picture-2.png",
  "/static/client-card-profile-picture.png",
  "/static/beauty_connect_logo_2_compressed.png",
  "/static/client-card-profile-picture-3.png",
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
    // <div className='my-1 min-w-[200px] sm:max-w-[350px]'>
    <div
      id="card-container"
      className=" min-w-[200px] sm:max-w-[350px] w-full flex flex-col flex-auto border rounded-lg text-sm shadow-md my-2"
    >
      <div id="title-picture-container" className="w-full">
        <Carousel state={images} width={"120"} />
      </div>
      <div
        id="card-details-container"
        className="flex flex-col justify-between p-4"
      >
        <div
          id="card-title"
          className="flex justify-between border-b pb-4 mb-2"
        >
          <CircleImage src={picture} alt="profile picture" size="70" />
          <div
            id="client-title-details"
            className="grow ml-3 flex flex-col justify-between"
          >
            <p className="text-lg font-bold text-black">
              {firstName} {lastName}
            </p>
            <p className=" text-blue-500">
              {services !== null ? services.join(", ") : "Specialist"}
            </p>
            <div className="flex justify-between">
              <p>Location: {location === null ? "Calgary, AB" : location}</p>
              <p>
                Avaliability: {schedules !== null ? schedules.join(" ") : "Mon"}
              </p>
            </div>
          </div>
        </div>
        <p className="pt-4 ">
          {userStory === false ||
            `Sint aliquip nulla ad cillum ex eiusmod proident cupidatat aliqua sit
          minim Sint aliquip nulla ad cillum ex eiusmod proident cupidatat
          aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod proident
          cupidatat aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod
          proident cupidatat aliqua sit minim`}
        </p>
      </div>
    </div>
    // </div>
  );
};

export default ClientCard;
