import React from "react";
import { MoveLeft, Share, Heart } from "lucide-react";
import Carousel from "src/components/Carousel";

const images = [
  "/static/nails-1.png",
  "/static/nails-2.png",
  "/static/nails-3.png",
  "/static/nails-4.png",
  "/static/nails-5.png",
];

const TestPage = () => {
  return (
    <div className="flex flex-col text-black font-nunito">
      <div id="cover-photo" className="relative">
        <div className=" absolute inset-x-6 top-5 text-black flex justify-between">
          <div className="p-2 bg-neutral-100 rounded-full border border-neutral-300">
            <MoveLeft size="24" />
          </div>
          <div className="flex space-x-6">
            <div className="p-2 bg-neutral-100 rounded-full border border-neutral-300">
              <Share size="24" />
            </div>
            <div className="p-2 bg-neutral-100 rounded-full border border-neutral-300">
              <Heart size="24" />
            </div>
          </div>
        </div>
        <img
          src="/static/cute-sanrio.jpg"
          alt="personal cover photo for aesthetician"
          className="h-70 w-full object-cover"
        />
      </div>
      <div
        id="aesthetician-card"
        className="relative -top-10 mx-6 border rounded-lg flex mb-8"
      >
        <img
          src="/static/crystal-profile-picture.jpg"
          className="w-2/5 rounded-l-lg"
        />
        <div className="rounded-r-lg grow flex flex-col py-2 px-4 text-white bg-brown">
          <h3 className="text-3xl font-bold">Sandy</h3>
          <h3 className="text-3xl font-bold">Leung</h3>
          <p>Nails</p>
          <p>4.8</p>
          <p>NE, Calgary, Alberta</p>
        </div>
      </div>
      <div id="aesthetician-body" className="mx-6 space-y-10">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">My Portfolio</h3>
          <Carousel width="225" state={images} className="px-0" />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">My Services</h3>
          <div id="service-buttons" className="flex">
            <button className="px-4 py-2 bg-brown text-white rounded-full">
              Nails
            </button>
          </div>
          <div id="service-card-container" className="space-y-4">
            {/* Create function to generate these dynamically */}

            <div className="h-32 p-4 border border-neutral-400 rounded-lg shadow-sm flex flex-col space-y-3">
              <div className="flex justify-between">
                <h4>Basic Manicure</h4>
                <p>From $60</p>
              </div>
              <p className="text-neutral-500 text-sm"></p>
            </div>
            <div className="h-32 p-4 border border-neutral-400 rounded-lg shadow-sm flex flex-col space-y-3">
              <div className="flex justify-between">
                <h4>French Manicure</h4>
                <p>From $60</p>
              </div>
              <p className="text-neutral-500 text-sm">
                classic nail service that features a nude or pale pink base with
                crisp, white tips
              </p>
            </div>
            <div className="h-32 p-4 border border-neutral-400 rounded-lg shadow-sm flex flex-col space-y-3">
              <div className="flex justify-between">
                <h4>Nail Repair</h4>
                <p>From $10</p>
              </div>
              <p className="text-neutral-500 text-sm"></p>
            </div>
            <div className="h-32 p-4 border border-neutral-400 rounded-lg shadow-sm flex flex-col space-y-3">
              <div className="flex justify-between">
                <h4>Polish Change</h4>
                <p>From $20</p>
              </div>
              <p className="text-neutral-500 text-sm"></p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">My Reviews</h3>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">My Portfolio</h3>
          <Carousel width="225" state={images} className="px-0" />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
