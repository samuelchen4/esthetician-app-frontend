import { create } from "zustand";
import { getDataApi } from "src/api/dataApi";

// Need to use store because some components will redirect to new page
// want the bottom nav to follow
const useDataStore = create((set) => ({
  data: [], // This is the property that holds the aetheticians from the API
  isLoading: false,
  getData: () => {
    set({ isLoading: true });
    const data = getDataApi();
    set({ isLoading: false });
  },
}));

export default useDataStore;
