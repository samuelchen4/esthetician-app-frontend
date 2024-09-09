import React, { useEffect } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  // UserButton,
  useUser,
} from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import useUserStore from '../stores/useUserStore';
import UserButton from './UserButton';
import { Loader } from 'lucide-react';

const Header = () => {
  // Clerk auth
  const { user: clerkUserObj } = useUser();
  // From Zustand store
  const user = useUserStore((state) => state.user);
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  const postUserInfo = useUserStore((state) => state.postUserInfo);
  const isLoading = useUserStore((state) => state.isLoading);
  const error = useUserStore((state) => state.error);

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

  // useEffect(() => {
  //   // if user is not null and doesnt have the role property
  //   if (user !== null && user?.role === null) {
  //     navigate('/sign-up/questionnaire');
  //   }
  // }, [user]);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

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
