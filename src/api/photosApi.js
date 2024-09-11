import api from './api-config';
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
