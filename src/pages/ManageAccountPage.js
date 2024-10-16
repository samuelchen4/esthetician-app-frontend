import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import CircleImage from "src/components/CircleImage";
import { ChevronRight, UserPen, PiggyBank } from "lucide-react";
import useUserStore from "src/stores/useUserStore";

const ManageAccountPage = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  // Redirect to LoginPage is user is not logged in
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  const {
    _id,
    first_name: firstName = "First",
    last_name: lastName = "Last",
    profile_picture: profilePicture,
    role,
  } = user || {};

  return (
    <div className="h-full py-2 mx-4 flex flex-col text-neutral-600 text-sm">
      <h2 className="text-black font-semibold text-xl mb-10">Manage Account</h2>
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

      <div id="account-settings" className="space-y-2">
        <h3 className="text-black font-semibold text-lg">Account settings</h3>

        <Link to={`/users/${_id}/personal-info`}>
          <div
            id="personal-information"
            className="py-1 px-2 flex items-center justify-between border-b rounded-lg"
          >
            <div className="flex items-center space-x-1">
              <UserPen size="15" />
              <p>Personal information</p>
            </div>
            <ChevronRight size="15" />
          </div>
        </Link>

        {role === "client" && (
          <Link to={`/users/${_id}/ethetician-info`}>
            <div
              id="personal-information"
              className="py-1 px-2 flex items-center justify-between border-b rounded-lg"
            >
              <div className="flex items-center space-x-1">
                <UserPen size="15" />
                <p>Client Information</p>
              </div>
              <ChevronRight size="15" />
            </div>
          </Link>
        )}
      </div>
      {role !== "client" && (
        <div
          id="switch-to-client-container"
          className="mt-auto mb-8 border rounded-lg mx-4 py-2 px-4 shadow-md flex justify-between "
        >
          <div>
            <h4 className="text-black font-semibold">
              Switch to being a client
            </h4>
            <p>Its simple to setup and start earning!</p>
          </div>
          <PiggyBank size="40" className="text-black" />
        </div>
      )}
    </div>
  );
};

export default ManageAccountPage;
