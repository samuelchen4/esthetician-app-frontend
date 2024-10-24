import api from 'src/api/api-config';

export const getReviewsApi = async (userId) => {
  try {
    const { data } = await api.get(`/api/reviews/users/${userId}`);
    console.log('data: ', data);
    const reviews = data.data;
    return reviews;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in getReviewsApi method'
    );
  }
};
