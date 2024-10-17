import { create } from 'zustand';
import { getLikesApi, postLikeApi, deleteLikeApi } from 'src/api/likesApi';

const useLikesStore = create((set) => ({
  likes: [],
  isLoading: false,
  getLikes: async (userId) => {
    set({ isLoading: true });
    // gets all likes for a userId
    const likes = await getLikesApi(userId);
    console.log('getLikes: ', likes);
    set({ isLoading: false, likes });
  },
  addLike: async (userId, aestheticianId) => {
    console.log('Api call to add like');
    const like = await postLikeApi(userId, aestheticianId);
    set((state) => ({ likes: [...state.likes, like] }));
  },
  deleteLike: async (userId, aestheticianId) => {
    console.log('Api call to delete like');
    const deletedLike = await deleteLikeApi(userId, aestheticianId);
    set((state) => ({
      likes: state.likes.filter(
        (like) => like.aesthetician_id !== deletedLike.aesthetician_id
      ),
    }));
  },
}));

export default useLikesStore;
