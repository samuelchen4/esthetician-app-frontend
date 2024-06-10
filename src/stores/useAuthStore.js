// useAuthStore.js
import { create } from 'zustand';
import { login as loginApi } from '../api/auth';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  user: null,
  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const { data: user } = await loginApi(username, password);
      set({ isLoggedIn: true, user, loading: false });
    } catch (error) {
      console.error('Login failed:', error);
      set({ loading: false, error: error.message });
    }
  },
  logout: () => set({ isLoggedIn: false, user: null }),
}));

export default useAuthStore;
