import api from './api-config';
import axios from 'axios';
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

// DESC: post photos by _id
// METHOD: POST
export const postPhotosById = async (userId, photos) => {
  try {
    const body = { photos };
    const { data: response } = await api.post(
      `/api/users/${userId}/photos`,
      body
    );
    const data = response.data;
    console.log('photos: ', data);
    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in postPhotosById method'
    );
  }
};

// DESC: get pre-signed URLs for S3 based on the number of images needed to be uploaded
// photos: Array of objects where objects have the photoId and the file type
// METHOD: GET
export const generatePresignedS3Urls = async (userId, photos) => {
  try {
    const body = { photos };
    const { data } = await api.post(
      `/api/users/${userId}/photos/presigned-urls`,
      body
    );
    // console.log(data);
    const urls = data.urls;
    return urls;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Frontend error in generatePresignedS3Urls method'
    );
  }
};

// DESC: Upload image directly to S3 from frontend
// METHOD: POST
export const postPhotoToS3 = async (presignedURL, photo) => {
  try {
    const config = { headers: { 'Content-Type': photo.type } };

    const response = await axios.put(presignedURL, photo, config);
    console.log('Upload successful with status:', response.status);
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Frontend error in postPhotoToS3 method'
    );
  }
};

// DESC: Gets presigned url for viewing photos from s3
// Method: GET
export const getPhotoFromS3 = async (s3Key) => {
  try {
    const config = { params: { key: s3Key } };
    const { data } = await api.get('/api/photos/keys', config);
    console.log(data);
    const url = data.url;
    return url;
  } catch (error) {
    console.error(error);
    throw new Error(
      error.response?.data?.message || 'Frontend error in getPhotoFromS3 method'
    );
  }
};
