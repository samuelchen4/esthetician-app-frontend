import api from './api-config';

// DESC: get schedules by _id
// METHOD: GET
export const getSchedulesById = async (userId) => {
  try {
    const { data } = await api.get(`/api/users/${userId}/schedules`);
    const schedules = data.data;
    // console.log('schedules: ', schedules);
    return schedules;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in getSchedulesById method'
    );
  }
};
