import { create } from 'zustand';
import { getServicesById } from 'src/api/usersApi';

const useServicesStore = create((set) => ({
  isLoading: false,
  services: null, // Null value means api call hasnt ran yet
  getServices: async (userId) => {
    set({ isLoading: true });
    // Should return an array of services
    const services = await getServicesById(userId);
    set({ isLoading: false, services });
  },
  postServices: async (userId, services) => {
    set({ isLoading: true });
    // Should return an array of services
    // const services = await postServicesById(userId, services);
    set({ isLoading: false, services });
  },
}));

export default useServicesStore;
