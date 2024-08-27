// useAuthStore.js
import { create } from 'zustand';
import { getUserByClerkId, postUserByClerkId } from '../api/usersApi';

const useUserStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: false,
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
}));

export default useUserStore;
