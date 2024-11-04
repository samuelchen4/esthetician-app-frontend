import api from 'src/api/api-config';

import { useState, useEffect } from 'react';

export const usePhotos = (profilePhotoKey, photos) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [profileUrl, setProfileUrl] = useState();

  useEffect(() => {
    async function getPresignedUrls() {
      const body = { keys: photos };
      const { data } = await api.post(`/api/photos/keys`, body);
      setImageUrls([...data.presignedUrls]);
    }
    getPresignedUrls();
  }, []);

  const getProfilePhoto = async (key) => {
    const body = { keys: [key] };
    const { data } = await api.post(`/api/photos/keys`, body);
    setProfileUrl(...data.presignedUrls);
  };

  getProfilePhoto(profilePhotoKey);

  return { imageUrls, profileUrl };
};
