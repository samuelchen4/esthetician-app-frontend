import React from 'react';
import { cn } from 'src/lib/utils';
import { Earth, Search, Heart, CircleUserRound } from 'lucide-react';
import useMobileNavStore from 'src/stores/useMobileNavStore';
import { useRouter } from 'src/hooks/useRouter';

const MobileNav = ({ className }) => {
  const { page, goToPage } = useRouter();

  // Zustand
  const isOpenMobileNavStore = useMobileNavStore((state) => state.isOpen);

  const handleClick = (e) => {
    const route = e.currentTarget.name;
    console.log('route: ', route);
    goToPage(`/${route}`);
  };

  if (!isOpenMobileNavStore) return <></>;

  return (
    <div
      className={cn(
        'flex justify-between px-6 pt-3 pb-safe-bottom bg-white border-t border-gray-300 font-nunito',
        className
      )}
    >
      <button
        name='explore'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          page === 'explore' && 'text-primary'
        )}
        to={'/explore'}
      >
        <Earth size='24' className='stroke-2' />
        <p className='text-xs font-semibold'>Explore</p>
      </button>
      <button
        name='search'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          page === 'search' && 'text-primary'
        )}
      >
        <Search size='24' className=' stroke-2' />
        <p className='text-xs  font-semibold'>Search</p>
      </button>
      <button
        name='likes'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          page === 'likes' && 'text-primary'
        )}
      >
        <Heart size='24' className=' stroke-2' />
        <p className='text-xs  font-semibold '>Likes</p>
      </button>
      <button
        name='profile'
        onClick={handleClick}
        className={cn(
          'flex flex-col items-center text-gray-400 space-y-0.5 pb-3',
          page === 'profile' && 'text-primary'
        )}
      >
        <CircleUserRound size='24' className='stroke-2' />
        <p className='text-xs  font-semibold'>Profile</p>
      </button>
    </div>
  );
};

export default MobileNav;
