import { create } from 'zustand';

// Need to use store because some components will redirect to new page
// want the bottom nav to follow
const useSearchStore = create((set) => ({
  city: 'Calgary',
  setCity: (newCity) => {
    set({ city: newCity });
  },
  province: 'Alberta',
  setProvince: (newProvince) => {
    set({ province: newProvince });
  },
  service: '',
  //   sets service to the argument
  setService: (newService) => {
    set({ service: newService });
  },
  filter: '',
  setFilter: (newFilter) => {
    set({ filter: newFilter });
  },
  lat: 51.0447,
  long: -114.0719,
  limit: 10,
  page: 1,
  searchKeyword: '',
  setSearchKeyword: (newKeyword) => {
    set({ searchKeyword: newKeyword });
  },
}));

export default useSearchStore;
