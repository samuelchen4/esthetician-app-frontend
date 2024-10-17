import { create } from "zustand";

const useLikesStore = create((set) => ({
  likes: [],
  isLoading: false,
  getLikes: async (userId) => {
    set({ isLoading: true });
    // gets all likes for a userId
    console.log("Api call to get all likes for a userId");
    set({ isLoading: false });
  },
  addLike: async (id) => {
    console.log("Api call to add like");

    // append new like to likes
  },
  deleteLike: async (id) => {
    console.log("Api call to delete like");

    // append new like to likes
  },
}));

export default useLikesStore;
