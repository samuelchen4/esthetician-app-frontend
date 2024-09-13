import { create } from 'zustand';
import { getSchedulesById, postSchedulesById } from 'src/api/schedulesApi';

const useSchedulesStore = create((set) => ({
  isLoading: false,
  schedules: null, // Null value means api call hasnt ran yet
  getSchedules: async (userId) => {
    set({ isLoading: true });
    // Should return an array of services
    const schedules = await getSchedulesById(userId);
    set({ isLoading: false, schedules });
  },
  postSchedules: async (userId, schedules) => {
    set({ isLoading: true });
    // Should return an array of services
    const schedulesData = await postSchedulesById(userId, schedules);
    set({ isLoading: false, schedules: schedulesData });
  },
}));

export default useSchedulesStore;
