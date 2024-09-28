import React, { useEffect } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  // UserButton,
  useUser,
} from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import useUserStore from 'src/stores/useUserStore';
import useServicesStore from 'src/stores/useServicesStore';
import useSchedulesStore from 'src/stores/useSchedulesStore';
import usePhotosStore from 'src/stores/usePhotosStore';
import UserButton from './UserButton';
import { Skeleton } from 'src/components/ui/skeleton';

const Header = () => {
  // Clerk auth
  const clerkUserObj = useUser();
  const { isLoaded: clerkIsLoaded, isSignedIn, user: clerkUser } = clerkUserObj;

  console.log('clerkUserObj: ', clerkUserObj);
  // From Zustand store
  const user = useUserStore((state) => state.user);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const postUserInfo = useUserStore((state) => state.postUserInfo);

  const services = useServicesStore((state) => state.services);
  const getServicesServer = useServicesStore((state) => state.getServices);

  const photos = usePhotosStore((state) => state.photos);
  const getPhotosServer = usePhotosStore((state) => state.getPhotos);

  const schedules = useSchedulesStore((state) => state.schedules);
  const getSchedulesServer = useSchedulesStore((state) => state.getSchedules);

  useEffect(() => {
    console.log(clerkUserObj);
  }, [clerkUserObj]);

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
      }
    }
  }, [clerkUser]);

  // If user is a service provider, fetch services, schedules, and photos
  useEffect(() => {
    if (user !== null) {
      if (services === null) {
        getServicesServer(user._id);
      }

      if (photos === null) {
        getPhotosServer(user._id);
      }

      if (schedules === null) {
        getSchedulesServer(user._id);
      }
    }
  }, [
    user,
    services,
    photos,
    schedules,
    getServicesServer,
    getPhotosServer,
    getSchedulesServer,
  ]);

  useEffect(() => {
    if (
      user !== null &&
      services !== null &&
      photos !== null &&
      schedules !== null
    ) {
      console.log('user', user);
      console.log('services: ', services);
      console.log('photos: ', photos);
      console.log('schedules: ', schedules);
    }
  }, [user, services, photos, schedules]);

  if (!clerkIsLoaded || (isSignedIn && user === null))
    return (
      <div
        id='header-container'
        className='fixed top-0 bg-white shadow-sm flex items-center justify-between py-2 px-6 w-full h-[50px]'
      >
        <img
          src='/static/beauty_connect_logo_2_compressed.png'
          alt='logo'
          className='h-7'
        />
        <Skeleton className='rounded-full w-8 h-8 border' />
      </div>
    );

  return (
    <div
      id='header-container'
      className='fixed top-0 bg-white shadow-sm flex items-center justify-between py-2 px-6 w-full h-[50px]'
    >
      {/* if clerk user is loaded and user store isnt show skeleton */}
      <Link to='/'>
        <img
          src='/static/beauty_connect_logo_2_compressed.png'
          alt='logo'
          className='w-12 h-full'
        />
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton
          profilePicture={user !== null ? user.profile_picture : null}
        />
      </SignedIn>
    </div>
  );
};

export default Header;
