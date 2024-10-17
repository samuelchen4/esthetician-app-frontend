// useAuthStore.js
import { create } from 'zustand';
import {
  getUserByClerkId,
  patchNameById,
  patchEmailById,
  patchRoleById,
  postClientInfo,
  postUserByClerkId,
  patchPhoneById,
  patchAddressById,
  patchBasicUserInfoById,
} from '../api/usersApi';
import useLikesStore from 'src/stores/useLikesStore';

const useUserStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: false,
  patchUserName: async (userId, firstName, lastName) => {
    set({ isLoading: true });
    const userInfo = await patchNameById(userId, firstName, lastName);
    set({ user: userInfo, isLoading: false });
  },
  patchEmail: async (userId, email) => {
    set({ isLoading: true });
    const userInfo = await patchEmailById(userId, email);
    set({ user: userInfo, isLoading: false });
  },
  patchPhone: async (userId, phone) => {
    set({ isLoading: true });
    const userInfo = await patchPhoneById(userId, phone);
    set({ user: userInfo, isLoading: false });
  },
  patchAddress: async (userId, address, postalCode, city, province) => {
    set({ isLoading: true });
    const userInfo = await patchAddressById(
      userId,
      address,
      postalCode,
      city,
      province
    );
    set({ user: userInfo, isLoading: false });
  },
  patchUserRole: async (userId, isClient) => {
    set({ isLoading: true });
    const role = isClient ? 'client' : 'user';
    const userInfo = await patchRoleById(userId, role);
    set({ user: userInfo, isLoading: false });
  },
  // Get userInfo by clerkId
  getUserInfo: async (clerkUserId) => {
    set({ isLoading: true });
    const userInfo = await getUserByClerkId(clerkUserId);
    set({ user: userInfo, isLoading: false });
  },
  postUserInfo: async (clerkUserId, firstName, lastName, email) => {
    set({ isLoading: true });
    const userInfo = await postUserByClerkId(
      clerkUserId,
      firstName,
      lastName,
      email
    );
    set({ user: userInfo, isLoading: false });
  },
  // Deparcated
  postUserClientInfo: async (userId, clientInfoArray) => {
    set({ isloading: true });
    const updatedUserInfo = await postClientInfo(userId, clientInfoArray);
    set({ user: updatedUserInfo, isLoading: false });
  },
  // patches first, last, email and role
  patchBasicUserInfo: async (userId, firstName, lastName, email, role) => {
    set({ isLoading: true });
    const updatedUserInfo = await patchBasicUserInfoById(
      userId,
      firstName,
      lastName,
      email,
      role
    );
    set({ user: updatedUserInfo, isloading: false });
  },
}));

// subscribe takes a state value and acallback, like useEffect but outside of react
useUserStore.subscribe(
  (state) => state.user,
  (user) => {
    console.log('subscribe method triggered!');
    // User has authed, get all the likes
    if (user !== null) {
      console.log('Calling get likes');
      const userId = user._id;
      useLikesStore.getState().getLikes(userId);
    }
  }
);

export default useUserStore;
