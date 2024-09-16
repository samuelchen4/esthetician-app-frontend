import { create } from 'zustand';
import { getPhotosById, postPhotosById } from 'src/api/photosApi';

const usePhotosStore = create((set) => ({
  isLoading: false,
  photos: null, // Null value means api call hasnt ran yet
  getPhotos: async (userId) => {
    set({ isLoading: true });
    // Should return an array of services
    const photos = await getPhotosById(userId);
    set({ isLoading: false, photos });
  },
  postPhotos: async (userId, data) => {
    set({ isLoading: true });
    const photos = await postPhotosById(userId, data);
    set({ isLoading: false, photos });
  },
}));

export default usePhotosStore;
