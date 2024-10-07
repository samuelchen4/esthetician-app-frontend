import React from "react";
import { MoveLeft, Heart, Instagram } from "lucide-react";
import CircleImage from "src/components/CircleImage";
import { Button } from "src/components/ui/button";
import Carousel from "src/components/Carousel";
import GoogleMapReact from "google-map-react";

const images = [
  "/static/nails-1.png",
  "/static/nails-2.png",
  "/static/nails-3.png",
  "/static/nails-4.png",
  "/static/nails-5.png",
];

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const TestPage = () => {
  return (
    <div className="flex flex-col text-neutral-500 text-base  space-y-10 font-roboto">
      <div className="relative">
        <img src="/static/nails-1.png" className="w-full h-80 object-fill" />
        <div className="absolute top-0 bg-gray-500 opacity-30 w-full h-80"></div>
      </div>
    </div>
  );
};

export default TestPage;
