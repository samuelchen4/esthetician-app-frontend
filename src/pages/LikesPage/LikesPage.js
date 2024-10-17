import React from 'react';
import CircleImage from 'src/components/CircleImage';
import { ChevronRight, UserPen, PiggyBank } from 'lucide-react';
import useUserStore from 'src/stores/useUserStore';

const LikesPage = () => {
  const user = useUserStore((state) => state.user);
  const {
    first_name: firstName = 'First',
    last_name: lastName = 'Last',
    profile_picture: profilePicture,
    role,
  } = user || {};

  return (
    <div className='h-full py-2 mx-4 flex flex-col text-neutral-600 text-sm'>
      <h2 className='text-black font-semibold text-xl mb-10'>Likes</h2>
      <div
        id='profile-button'
        className='mb-7 flex items-center justify-between p-2 border-b rounded-lg shadow-sm'
      >
        <div className='flex space-x-2 '>
          <CircleImage
            size='50'
            src={profilePicture || '/static/blank-profile-picture.png'}
          />
          <div className='flex flex-col justify-center'>
            <p>
              {firstName} {lastName}
            </p>
            <p>Show Profile</p>
          </div>
        </div>
        <ChevronRight size='20' />
      </div>
    </div>
  );
};

export default LikesPage;
