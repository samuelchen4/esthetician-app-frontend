import { create } from 'zustand';
import { getSchedulesById } from 'src/api/schedulesApi';

const useSchedulesStore = create((set) => ({
  isLoading: false,
  schedules: null, // Null value means api call hasnt ran yet
  getSchedules: async (userId) => {
    set({ isLoading: true });
    // Should return an array of services
    const schedules = await getSchedulesById(userId);
    set({ isLoading: false, schedules });
  },
}));

export default useSchedulesStore;
