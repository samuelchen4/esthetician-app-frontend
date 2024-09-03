// useAuthStore.js
import { create } from 'zustand';
import {
  getUserByClerkId,
  patchRoleById,
  postClientInfo,
  postUserByClerkId,
} from '../api/usersApi';

const useUserStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  isLoading: false,
  patchUserRole: async (userId, isClient) => {
    set({ isLoading: true });
    const role = isClient ? 'client' : 'user';
    const userInfo = await patchRoleById(userId, role);
    set({ user: userInfo, isLoading: false });
  },
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
  postUserClientInfo: async (userId, clientInfoArray) => {
    set({ isloading: true });
    const updatedUserInfo = await postClientInfo(userId, clientInfoArray);
    set({ user: updatedUserInfo, isLoading: false });
  },
}));

export default useUserStore;
