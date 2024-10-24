import { create } from 'zustand';

// Need to use store because some components will redirect to new page
// want the bottom nav to follow
const useMobileNavStore = create((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
}));

export default useMobileNavStore;
