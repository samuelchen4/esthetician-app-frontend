import { create } from "zustand";

// Need to use store because some components will redirect to new page
// want the bottom nav to follow
const useSearchStore = create((set) => ({
  city: "",
  province: "",
  service: "",
  //   sets service to the argument
  setService: (newService) => {
    set({ service: newService });
  },
  filter: "",
  setFilter: (newFilter) => {
    set({ filter: newFilter });
  },
}));

export default useSearchStore;
