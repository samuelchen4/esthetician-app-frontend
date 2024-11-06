import api from "src/api/api-config";
import { useState, useEffect } from "react";
import { getPhotosById as getPhotosByIdApi } from "src/api/photosApi";

// takes an ID and handles all the logic with photos
export const usePhotos = (id, profilePhoto, coverPhoto) => {
  const [photos, setPhotos] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [profileUrl, setProfileUrl] = useState();

  useEffect(() => {
    const getPhotosById = async () => {
      console.log("id: ", id);
      const photosApi = await getPhotosByIdApi(id);
      console.log("photosApi: ", photosApi);
      setPhotos(photosApi);
    };

    getPhotosById();
  }, [id]);

  useEffect(() => {
    async function getPresignedUrls() {
      const s3Urls = photos
        .map((obj) => obj.image_url)
        .filter((obj) => obj !== null);
      console.log("s3Urls: ", s3Urls);
      const body = { keys: s3Urls };
      const { data } = await api.post(`/api/photos/keys`, body);
      setImageUrls([...data.presignedUrls]);
    }
    if (photos.length !== 0) {
      getPresignedUrls();
    }
  }, [photos]);

  useEffect(() => {
    const getProfilePhoto = async (key) => {
      const body = { keys: [key] };
      const { data } = await api.post(`/api/photos/keys`, body);
      setProfileUrl(...data.presignedUrls);
    };
    if (profilePhoto) {
      getProfilePhoto(profilePhoto);
    }
  }, [profilePhoto]);

  // useEffect(() => {
  //   const getCoverPhoto = async (key) => {
  //     const body = { keys: [key] };
  //     const { data } = await api.post(`/api/photos/keys`, body);
  //     setProfileUrl(...data.presignedUrls);
  //   };
  //   if (coverPhoto) {
  //     getProfilePhoto(coverPhoto);
  //   }
  // }, [coverPhoto]);

  return { imageUrls, profileUrl };
};
