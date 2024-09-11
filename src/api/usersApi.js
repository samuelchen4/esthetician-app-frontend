import api from './api-config';

// GET user info by clerk id
export const getUserByClerkId = async (clerkUserId) => {
  try {
    const response = await api.get(`/api/clerk-users/${clerkUserId}`);
    console.log('getUserByClerkId response: ', response);
    const data = response.data.data === null ? null : response.data.data[0];
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in getUserByClerkId method'
    );
  }
};

// POST user info by clerk id
export const postUserByClerkId = async (
  clerkUserId,
  firstName,
  lastName,
  email
) => {
  try {
    const data = { firstName, lastName, email };
    const response = await api.post(`/api/clerk-users/${clerkUserId}`, data);

    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in postUserByClerkId method'
    );
  }
};

export const patchNameById = async (userId, firstName, lastName) => {
  try {
    const body = {
      firstName,
      lastName,
    };
    const response = await api.patch(`/api/users/${userId}/names`, body);
    // console.log('patchNameById executed successfully!');
    // console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in patchNameById method'
    );
  }
};

export const patchEmailById = async (userId, email) => {
  try {
    const body = {
      email,
    };
    const response = await api.patch(`/api/users/${userId}/emails`, body);
    console.log('patchEmailById executed successfully!');
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in patchEmailById method'
    );
  }
};

export const patchPhoneById = async (userId, phone) => {
  try {
    const body = {
      phone,
    };
    const response = await api.patch(`/api/users/${userId}/phones`, body);
    console.log('patchPhoneById executed successfully!');
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in patchPhoneById method'
    );
  }
};

export const patchAddressById = async (
  userId,
  address,
  postalCode,
  city,
  province
) => {
  try {
    const body = {
      userId,
      address,
      postalCode,
      city,
      province,
    };
    const response = await api.patch(`/api/users/${userId}/address`, body);
    console.log('patchAddressById executed successfully!');
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in patchAddressById method'
    );
  }
};
export const patchRoleById = async (userId, role) => {
  try {
    const body = {
      role,
    };
    const response = await api.patch(`/api/users/${userId}/roles`, body);
    console.log('poatchROleId executed successfully!');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in patchRoleById method'
    );
  }
};

// DESC: POSTS the schedule and services of a client and updates the basic info
// METHOD: POST
export const postClientInfo = async (userId, clientInfoArray) => {
  try {
    const body = { clientInfoArray };
    console.log('clientInfoArray: ', clientInfoArray);
    const response = await api.post(`/api/users/${userId}/clients`, body);
    console.log('response:', response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // returns the new userInfo
    const userInfo = response.data.data.userInfo;
    return userInfo;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in postClientInfo method'
    );
  }
};

// DESC: get user info by _id
// METHOD: GET
export const getUserInfoById = async (userId) => {
  try {
    const { data } = await api.get(`/api/users/${userId}`);
    const userInfo = data.data;
    // console.log('userInfo: ', userInfo);
    return userInfo;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in getUserInfoById method'
    );
  }
};

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

// DESC: get photos by _id
// METHOD: GET
export const getPhotosById = async (userId) => {
  try {
    const { data } = await api.get(`/api/users/${userId}/photos`);
    const photos = data.data;
    // console.log('photos: ', photos);
    return photos;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in getPhotosById method'
    );
  }
};

// DESC: Get services by _id
// METHOD: GET
export const getServicesById = async (userId) => {
  try {
    const { data } = await api.get(`/api/users/${userId}/services`);
    const services = data.data;
    // console.log('services: ', services);
    return services;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in getServicesById method'
    );
  }
};
