// Gets user info if user is logged in
// This script runs to call user info from PostgresDB if user state object from Clerk is not null or undefined

import { Clerk } from '@clerk/clerk-js';
import useUserStore, {
  initializeUserStoreListener,
} from 'src/stores/useUserStore';
import useLikesStore from 'src/stores/useLikesStore';
import usePhotosStore from 'src/stores/usePhotosStore';
import useServicesStore from 'src/stores/useServicesStore';

const CLERK_API_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const clerk = new Clerk(CLERK_API_KEY);

const resetStores = () => {
  useLikesStore.setState((state) => ({ ...state, likes: [] }));
  usePhotosStore.setState((state) => ({ ...state, photos: [] }));
  useServicesStore.setState((state) => ({ ...state, services: [] }));
};

// function to grab user info from db
const userLoggedIn = async (user) => {
  console.log('User is logged in: ', user);
  const { id: clerkId } = user;
  console.log('Clerk User Id: ', clerkId);

  // update user Store
  const getUserByClerkId = useUserStore.getState().getUserInfo;
  await getUserByClerkId(clerkId);
  const userId = useUserStore.getState().user._id;
  // Just call Likes directly
  useLikesStore.getState().getLikes(userId);
};

const userLoggedOut = () => {
  useUserStore.setState((state) => ({
    ...state,
    user: null,
  }));

  //   Just reset the state directly
  resetStores();
};

export const initializeFromClerk = () => {
  // adds listeners for when userStore changes
  //   This is not working, but the setup is so sick
  //   initializeUserStoreListener();

  clerk.addListener((emission) => {
    console.log('Clerk resources have changed. Resources: ', emission);
    const { user } = emission;
    if (user !== undefined && user !== null) {
      userLoggedIn(user);
    } else {
      // user is logged out, clear the user store
      userLoggedOut();
    }
  });

  clerk.load();
};
