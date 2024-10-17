import { create } from 'zustand';
import {
  getClosestDataApi,
  getDataApi,
  getTrendingDataApi,
} from 'src/api/dataApi';

// Need to use store because some components will redirect to new page
// want the bottom nav to follow
const useDataStore = create((set) => ({
  data: [], // This is the property that holds the aetheticians from the API
  isLoading: false,
  getData: async (lat, long, city, province, service, limit, page, filter) => {
    set({ isLoading: true });
    const data = await getDataApi(
      lat,
      long,
      city,
      province,
      service,
      limit,
      page
    );
    console.log('data: ', data);
    // filter data if results come back
    const filteredData = filterData(filter, data);
    set({ isLoading: false, data: filteredData });
  },
  getTrendingData: async (lat, long, city, province, limit, page) => {
    set({ isLoading: true });
    const data = await getTrendingDataApi(
      lat,
      long,
      city,
      province,
      limit,
      page
    );
    console.log('data: ', data);
    set({ isLoading: false, data });
  },
  getClosestData: async (lat, long, city, province, limit, page) => {
    set({ isLoading: true });
    const data = await getClosestDataApi(
      lat,
      long,
      city,
      province,
      limit,
      page
    );
    console.log('data: ', data);
    set({ isLoading: false, data });
  },
}));

// make function to determining the sort param
//    rn just do it by key words: eg:// nearby trending
const filterData = (keyword, data) => {
  try {
    // add more keywords as they grow
    let newData = [...data];
    switch (keyword) {
      case 'Trending':
        newData.sort((a, b) => b.rating - a.rating);
        break;
      case 'Nearby':
        newData.sort((a, b) => a.distance - b.distance);
        break;
      default:
        console.log('no filter');
    }

    return newData;
  } catch (err) {
    console.log('Error Message: ', err.message);
    throw new Error(err.message);
  }
};

// useDataStore
//   .getState()
//   .getData(
//     51.0447,
//     -114.0719,
//     'Calgary',
//     'Alberta',
//     'Nails',
//     10,
//     1,
//     'trending'
//   );

export default useDataStore;
