import { create } from 'zustand';
import { getPhotosById } from 'src/api/photosApi';

const usePhotosStore = create((set) => ({
  isLoading: false,
  photos: null, // Null value means api call hasnt ran yet
  getPhotos: async (userId) => {
    set({ isLoading: true });
    // Should return an array of services
    const photos = await getPhotosById(userId);
    set({ isLoading: false, photos });
  },
}));

export default usePhotosStore;
