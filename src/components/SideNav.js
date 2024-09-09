import React from 'react';
import { Link } from 'react-router-dom';
import { SignOutButton } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import { UserRoundCog } from 'lucide-react';
import { LogOut } from 'lucide-react';

const SideNav = ({ setter, userId, firstName, lastName, email }) => {
  const setFalse = () => {
    setter(false);
  };

  return (
    <div className='fixed w-full h-[calc(100dvh-50px)] top-[50px] left-0 right-0 flex text-sm'>
      <div className='grow bg-gray-100 opacity-40' onClick={setFalse}></div>
      <div className='w-60 h-full opacity-100 bg-red-200 ml-auto p-2 flex flex-col'>
        <div className='bg-blue-100 p-1 rounded-md mb-1'>
          <p>
            {firstName} {lastName}
          </p>
          <p className='overflow-x-hidden'>{email}</p>
        </div>
        <div className='p-1 my-1'>
          <Link to={`/users/${userId}/manage-account`} onClick={setFalse}>
            <div className='flex items-center space-x-1'>
              <Heart size='18' /> <p>Likes</p>
            </div>
          </Link>
        </div>
        <div className='p-1 my-1'>
          <Link to={`/users/${userId}/manage-account`} onClick={setFalse}>
            <div className=' flex items-center  space-x-1'>
              <UserRoundCog size='18' /> <p>Manage Account</p>
            </div>
          </Link>
        </div>
        <div className='p-1 my-1 flex items-center space-x-1'>
          <LogOut size='18' /> <SignOutButton />
        </div>
        <div className='p-1 mt-auto text-center'>
          <p>BeautyConnect</p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
