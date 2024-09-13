import api from './api-config';

// DESC: get schedules by _id
// METHOD: GET
export const getServicesById = async (userId) => {
  try {
    const { data } = await api.get(`/api/users/${userId}/services`);
    const services = data.data;
    // console.log('schedules: ', schedules);
    return services;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in getServicesById method'
    );
  }
};

// DESC: Post schedules by _id
// METHOD: POST
export const postServicesById = async (userId, services) => {
  try {
    const body = { services };

    const { data } = await api.post(`/api/users/${userId}/services`, body);
    const responseServices = data.data;
    console.log('services: ', responseServices);
    return responseServices;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in postServicesById method'
    );
  }
};
