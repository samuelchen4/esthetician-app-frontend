import React, { useEffect } from 'react';
import { cn } from 'src/lib/utils';
import { Earth, Search, Heart, CircleUserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import useMobileNavStore from 'src/stores/useMobileNavStore';

import useUserStore from 'src/stores/useUserStore';

const MobileNav = ({ className }) => {
  // Router
  const location = useLocation();

  // change the current page state everytime url changes
  useEffect(() => {
    // when location changes, get the new page
    getCurrentPageStore();
  }, [location]);

  // // For testing to see the user store
  // const user = useUserStore((state) => state.user);
  // useEffect(() => {
  //   console.log('Testing userStore: ', user);
  // }, [user]);

  // Zustand
  const isOpenMobileNavStore = useMobileNavStore((state) => state.isOpen);
  const currentPageStore = useMobileNavStore((state) => state.currentPage);
  const getCurrentPageStore = useMobileNavStore(
    (state) => state.getCurrentPage
  );
  const changePageStore = useMobileNavStore((state) => state.changePage);

  const handleClick = (e) => {
    const name = e.currentTarget.name;
    console.log('name: ', name);

    changePageStore(name);
  };

  if (!isOpenMobileNavStore) return <></>;

  return (
    <div
      className={cn(
        'flex justify-between px-6 pt-3 pb-safe-bottom bg-white border-t border-gray-300 font-nunito',
        className
      )}
    >
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
        to={`/profile`}
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
