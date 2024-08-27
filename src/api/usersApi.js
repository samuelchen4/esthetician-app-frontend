import api from './api-config';

// GET user info by clerk id
export const getUserByClerkId = async (clerkUserId) => {
  try {
    const response = await api.get(`/api/clerk-users/${clerkUserId}`);
    // console.log('getUserByClerkId response: ', response);
    const data = response.data === null ? null : response.data.data[0];
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
