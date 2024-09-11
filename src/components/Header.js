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
import { Loader } from 'lucide-react';

const Header = () => {
  // Clerk auth
  const { user: clerkUserObj } = useUser();
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
    if (clerkUserObj) {
      const {
        id: clerkUserId,
        firstName,
        lastName,
        primaryEmailAddress: primaryEmailAddressObj,
      } = clerkUserObj;
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
  }, [clerkUserObj]);

  // If user is a service provider, fetch services, schedules, and photos
  useEffect(() => {
    // users data is loaded and
    if (user !== null && services === null) {
      getServicesServer(user._id);
    }
    // users data is loaded and
    if (user !== null && photos === null) {
      getPhotosServer(user._id);
    }
    // users data is loaded and
    if (user !== null && schedules === null) {
      getSchedulesServer(user._id);
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
    console.log('user', user);

    console.log('services: ', services);
    console.log('photos: ', photos);
    console.log('schedules: ', schedules);
  }, [user, services, photos, schedules]);

  return (
    <div
      id='header-container'
      className='fixed top-0 bg-white shadow-sm flex items-center justify-between py-2 px-6 w-full h-[50px]'
    >
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
