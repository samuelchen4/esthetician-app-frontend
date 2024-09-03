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

export const patchRoleById = async () => {
  try {
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

// // DESC: PATCH basic info for user by _id
// // METHOD: PATCH
// export const patchNameUserById = async () => {
//   try {
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         'Frontend error in patchNameUserById method'
//     );
//   }
// };

// // DESC: Post services for a user by _id
// // METHOD: POST
// export const postServicesForUserById = async () => {
//   try {
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         'Frontend error in postServicesForUserById method'
//     );
//   }
// };

// // DESC: Post days availiable for a user by _id
// // METHOD: POST
// export const postScheduleForUserById = async () => {
//   try {
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.message ||
//         'Frontend error in postScheduleForUserById method'
//     );
//   }
// };
