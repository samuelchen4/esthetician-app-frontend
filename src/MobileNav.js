import React, { useState } from "react";
import { cn } from "src/lib/utils";
import { Earth, House, Search, Heart, CircleUserRound } from "lucide-react";

const MobileNav = ({ className }) => {
  const [selected, setSelected] = useState("");

  const handleClick = (e) => {
    const name = e.currentTarget.name;
    console.log("name: ", name);
    setSelected(name);
  };
  return (
    <div
      className={cn(
        "flex justify-between px-6 py-3 bg-white border-t border-gray-400 font-nunito",
        className
      )}
    >
      <button
        name="explore"
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center text-gray-500 space-y-0.5",
          selected === "explore" && "text-primary"
        )}
      >
        <Earth size="24" className="stroke-2" />
        <p className="text-xs font-bold">Explore</p>
      </button>
      <button
        name="search"
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center text-gray-500 space-y-0.5",
          selected === "search" && "text-primary"
        )}
      >
        <Search size="24" className=" stroke-2 " />
        <p className="text-xs font-bold">Search</p>
      </button>
      <button
        name="likes"
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center text-gray-500 space-y-0.5",
          selected === "likes" && "text-primary"
        )}
      >
        <Heart size="24" className=" stroke-2 " />
        <p className="text-xs font-bold">Likes</p>
      </button>
      <button
        name="profile"
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center text-gray-500 space-y-0.5",
          selected === "profile" && "text-primary"
        )}
      >
        <CircleUserRound size="24" className="stroke-2" />
        <p className="text-xs font-bold">Profile</p>
      </button>
    </div>
  );
};

export default MobileNav;
