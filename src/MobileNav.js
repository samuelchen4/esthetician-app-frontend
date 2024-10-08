import React, { useState, useEffect } from 'react';
import { cn } from 'src/lib/utils';
import { Earth, Search, Heart, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import useUserStore from 'src/stores/useUserStore';
import useMobileNavStore from 'src/stores/useMobileNavStore';

const MobileNav = ({ className }) => {
  // Clerk auth
  const clerkUserObj = useUser();
  const { isLoaded: clerkIsLoaded, isSignedIn, user: clerkUser } = clerkUserObj;

  // Zustand
  const userStore = useUserStore((state) => state.user);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const postUserInfo = useUserStore((state) => state.postUserInfo);

  const currentPageStore = useMobileNavStore((state) => state.currentPage);
  const changePageStore = useMobileNavStore((state) => state.changePage);

  useEffect(() => {
    if (clerkUser) {
      const {
        id: clerkUserId,
        firstName,
        lastName,
        primaryEmailAddressObj,
      } = clerkUser;
      const email = primaryEmailAddressObj?.emailAddress || '';

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

  const handleClick = (e) => {
    const name = e.currentTarget.name;
    console.log('name: ', name);

    changePageStore(name);
  };
  return (
    <div
      className={cn(
        'flex justify-between px-6 pt-3 pb-safe-bottom bg-white border-t border-gray-300 font-nunito',
        className
      )}
    >
      {/* <Link to={'/explore'}>
        <button
          name='explore'
          onClick={handleClick}
          className={cn(
            'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
            currentPageStore === 'explore' && 'text-primary'
          )}
        >
          <Earth size='24' className='stroke-2' />
          <p className='text-xs font-semibold'>Explore</p>
        </button>
      </Link> */}
      <Link
        name='explore'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          currentPageStore === 'explore' && 'text-primary'
        )}
        to={'/explore'}
      >
        <Earth size='24' className='stroke-2' />
        <p className='text-xs font-semibold'>Explore</p>
      </Link>
      <Link
        name='search'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          currentPageStore === 'search' && 'text-primary'
        )}
        to={'/search'}
      >
        <Search size='24' className=' stroke-2' />
        <p className='text-xs  font-semibold'>Search</p>
      </Link>
      <Link
        name='likes'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          currentPageStore === 'likes' && 'text-primary'
        )}
        to={'/likes'}
      >
        <Heart size='24' className=' stroke-2' />
        <p className='text-xs  font-semibold '>Likes</p>
      </Link>
      <Link
        to={`/users/manage-account`}
        name='profile'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          currentPageStore === 'profile' && 'text-primary'
        )}
      >
        <CircleUserRound size='24' className='stroke-2' />
        <p className='text-xs  font-semibold'>Profile</p>
      </Link>
    </div>
  );
};

export default MobileNav;
