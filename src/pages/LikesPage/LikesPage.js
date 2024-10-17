import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CircleImage from "src/components/CircleImage";
import { ChevronRight } from "lucide-react";
import useUserStore from "src/stores/useUserStore";

const LikesPage = () => {
  // Router
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  // Redirect to LoginPage is user is not logged in
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  const profilePicture = false;
  const firstName = "First";
  const lastName = "Last";

  // add page loader if values arent looking
  return (
    <div className="flex flex-col my-4 mb-20 mx-4 text-neutral-600 font-nunito">
      <h3 className="text-3xl text-black font-bold my-6">Likes</h3>
      <div className="space-y-6">
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
      </div>
      {/* Break code below into seperate component, LikesCard */}
    </div>
  );
};

export default LikesPage;
