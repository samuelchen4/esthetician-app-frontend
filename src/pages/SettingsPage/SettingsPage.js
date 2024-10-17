import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircleImage from "src/components/CircleImage";
import { ChevronRight, UserPen, PiggyBank } from "lucide-react";
import useUserStore from "src/stores/useUserStore";

const SettingsPage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  // Redirect to LoginPage is user is not logged in
  //   useEffect(() => {
  //     if (user === null) {
  //       navigate("/login");
  //     }
  //   }, [user, navigate]);

  const {
    _id,
    first_name: firstName = "First",
    last_name: lastName = "Last",
    profile_picture: profilePicture,
    role,
  } = user || {};

  return (
    <div className="flex flex-col my-4 mb-20 mx-4 text-neutral-600 font-nunito">
      <h3 className="text-3xl text-black font-bold my-6">Manage Account</h3>
      <div
        id="profile-button"
        className="mb-7 flex items-center justify-between p-2 border rounded-lg shadow-sm"
      >
        <div className="flex space-x-2 ">
          <CircleImage
            size="50"
            src={profilePicture || "/static/blank-profile-picture.png"}
          />
          <div className="flex flex-col justify-center">
            <p>
              {firstName} {lastName}
            </p>
            <p>Show Profile</p>
          </div>
        </div>
        <ChevronRight size="20" />
      </div>

      <div id="account-settings" className="space-y-6">
        <h3 className="text-2xl text-black font-bold tracking-wide">
          Account settings
        </h3>

        {/* <Link to={`/users/${_id}/personal-info`}> */}
        <div
          id="personal-information"
          className="py-1 px-2 flex items-center justify-between border-b rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <UserPen size="20" />
            <p>Personal information</p>
          </div>
          <ChevronRight size="15" />
        </div>
        {/* </Link> */}

        {role === "client" && (
          //   <Link to={`/users/${_id}/ethetician-info`}>
          <div
            id="personal-information"
            className="py-1 px-2 flex items-center justify-between border-b rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <UserPen size="20" />
              <p>Client Information</p>
            </div>
            <ChevronRight size="15" />
          </div>
          //   </Link>
        )}
      </div>
      {role !== "client" && (
        <div
          id="switch-to-client-container"
          className="absolute inset-x-0 bottom-40 border rounded-lg mx-4 py-2 px-4 shadow-md flex justify-between"
        >
          <div>
            <h4 className="text-black font-semibold">
              Switch to being a Aesthetician
            </h4>
            <p>Its simple to setup and start earning!</p>
          </div>
          <PiggyBank size="60" className="stroke-primary" />
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
