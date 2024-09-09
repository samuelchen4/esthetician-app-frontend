import React, { useState } from 'react';
import SideNav from './SideNav';
import useUserStore from 'src/stores/useUserStore';

const UserButton = ({ profilePicture }) => {
  const user = useUserStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  //   //   testing
  //   useEffect(() => {
  //     console.log(isOpen ? 'Side nav open' : 'Side nav closed!');
  //   }, [isOpen]);

  return (
    <>
      {isOpen && (
        <SideNav
          setter={setIsOpen}
          userId={user._id}
          firstName={user.first_name}
          lastName={user.last_name}
          email={user.email}
        />
      )}
      <button onClick={handleClick}>
        <img
          src={profilePicture || '/static/blank-profile-picture.png'}
          className='w-8 h-8 border rounded-full'
        />
      </button>
    </>
  );
};

export default UserButton;
