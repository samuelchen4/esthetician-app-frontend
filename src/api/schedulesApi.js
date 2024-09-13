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

// DESC: Post schedules by _id
// METHOD: POST
export const postSchedulesById = async (userId, schedules) => {
  try {
    const body = { schedules };
    const { data } = await api.post(`/api/users/${userId}/schedules`, body);
    const responseSchedules = data.data;
    // console.log('schedules: ', schedules);
    return responseSchedules;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in postSchedulesById method'
    );
  }
};
