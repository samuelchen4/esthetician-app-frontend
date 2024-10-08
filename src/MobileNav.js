import React, { useState, useEffect } from "react";
import { cn } from "src/lib/utils";
import { Earth, Search, Heart, CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import useUserStore from "src/stores/useUserStore";

const MobileNav = ({ className }) => {
  // Clerk auth
  const clerkUserObj = useUser();
  const { isLoaded: clerkIsLoaded, isSignedIn, user: clerkUser } = clerkUserObj;

  // Zustand
  const userStore = useUserStore((state) => state.user);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const postUserInfo = useUserStore((state) => state.postUserInfo);

  useEffect(() => {
    if (clerkUser) {
      const {
        id: clerkUserId,
        firstName,
        lastName,
        primaryEmailAddressObj,
      } = clerkUser;
      const email = primaryEmailAddressObj?.emailAddress || "";

      userIsAuthenticated();

      async function userIsAuthenticated() {
        await getUserInfo(clerkUserId);

        // Directly access the latest state from Zustand
        const currentUser = useUserStore.getState().user;
        if (currentUser === null) {
          await postUserInfo(clerkUserId, firstName, lastName, email);
        }
        console.log(userStore);
      }
    }
  }, [clerkUser]);
  // Local
  const [selected, setSelected] = useState("");

  const handleClick = (e) => {
    const name = e.currentTarget.name;
    console.log("name: ", name);
    setSelected(name);
  };
  return (
    <div
      className={cn(
        "flex justify-between px-6 py-2 bg-white border-t border-gray-200 font-nunito",
        className
      )}
    >
      <Link to={"/explore"}>
        <button
          name="explore"
          onClick={handleClick}
          className={cn(
            "flex flex-col items-center text-gray-400 space-y-0.5",
            selected === "explore" && "text-primary"
          )}
        >
          <Earth size="22" className="stroke-1" />
          <p className="text-xs font-light">Explore</p>
        </button>
      </Link>
      <button
        name="search"
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center text-gray-400 space-y-0.5",
          selected === "search" && "text-primary"
        )}
      >
        <Search size="22" className=" stroke-1" />
        <p className="text-xs font-light">Search</p>
      </button>
      <button
        name="likes"
        onClick={handleClick}
        className={cn(
          "flex flex-col items-center text-gray-400 space-y-0.5",
          selected === "likes" && "text-primary"
        )}
      >
        <Heart size="22" className=" stroke-1" />
        <p className="text-xs font-light">Likes</p>
      </button>
      <Link to={`/users/manage-account`}>
        <button
          name="profile"
          onClick={handleClick}
          className={cn(
            "flex flex-col items-center text-gray-400 space-y-0.5",
            selected === "profile" && "text-primary"
          )}
        >
          <CircleUserRound size="22" className="stroke-1" />
          <p className="text-xs font-light">Profile</p>
        </button>
      </Link>
    </div>
  );
};

export default MobileNav;
