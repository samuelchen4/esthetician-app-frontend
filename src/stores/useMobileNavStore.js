import { create } from 'zustand';

// Need to use store because some components will redirect to new page
// want the bottom nav to follow
const useMobileNavStore = create((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => {
    set({ isOpen });
  },
  currentPage: '',
  getCurrentPage: () => {
    const path = window.location.pathname;
    // console.log('path: ', path);

    // edge case
    if (path === '/') {
      set({ currentPage: 'explore' });
      return;
    }

    const regex = /^\/([^\/]+)/;
    const match = path.match(regex);

    if (match) {
      const newPage = match[1];
      // console.log(newPage);
      set({ currentPage: newPage });
    }
  },
  changePage: (page) => {
    set({ currentPage: page });
  },
}));

useMobileNavStore.getState().getCurrentPage();

export default useMobileNavStore;
