import { create } from 'zustand';
import { getServicesById, postServicesById } from 'src/api/servicesApi';

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
    const servicesData = await postServicesById(userId, services);
    console.log(servicesData);
    set({ isLoading: false, services: servicesData });
  },
}));

export default useServicesStore;
