import React, { useRef, useState, useEffect, useCallback } from 'react';
import usePhotosStore from 'src/stores/usePhotosStore';
import {
  generatePresignedS3Urls,
  postPhotoToS3,
  getPhotoFromS3,
} from 'src/api/photosApi';
import PulseLoader from 'src/components/PulseLoader';
import { Camera } from 'lucide-react';
import Carousel from 'src/components/Carousel';

const PicturesComponent = ({ userId }) => {
  // Store
  const photosStore = usePhotosStore((state) => state.photos);
  const photosStoreLoading = usePhotosStore((state) => state.isLoading);

  // Local
  const [photos, setPhotos] = useState(['1', '2', '3']);
  //   const [photosLoading, setPhotosLoading] = useState(false);
  const [tempPhotos, setTempPhotos] = useState([]);
  const tempPhotoObjects = useRef([]);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [photosErrorOpen, setPhotosErrorOpen] = useState(false);

  const renderPhotos = useCallback(async () => {
    // Get presignedURLs for photos
    //
    const photosUrlArray = photosStore?.map((photosObj) => {
      const { image_url: key, image_url_local: localKey } = photosObj;
      if (localKey !== null) {
        return localKey;
      }
      const url = getPhotoFromS3(key);
      return url;
    });

    // Load all photos together
    const results = await Promise.allSettled(photosUrlArray);

    results.forEach((result) => console.log('result: ', result));

    const photoUrls = results.map((result) => {
      const { status, value } = result;
      if (status === 'fulfilled') {
        return value;
      } else {
        return '/static/logo-square.png';
      }
    });
    // return results;
    setPhotos(photoUrls);
  }, [photosStore]);

  useEffect(() => {
    if (photosStore !== null) {
      renderPhotos();
    }
  }, [photosStore, renderPhotos]);

  const togglePhotosOpen = () => {
    if (photosErrorOpen === true) {
      setPhotosErrorOpen(false);
    }
    // toggle between open states
    setPhotosOpen(!photosOpen);
  };

  const cancelPhotos = () => {
    renderPhotos();
    togglePhotosOpen();
    setTempPhotos([]);
  };

  const addPhoto = (e) => {
    // get files
    const files = e.target.files;
    console.log('files: ', files); // Get object of files, convert to an array

    const filesArray = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );
    console.log('filesArray: ', filesArray);

    // get imageUrls
    const imageUrlArray = filesArray.map((image) => {
      const url = URL.createObjectURL(image);
      const imageId = `${Math.random()}-${Date.now()}`;
      tempPhotoObjects.current.push({ imageId, url, image });
      return url;
    }); // Get temp url for each object,
    console.log('imageUrlArray: ', imageUrlArray);
    // on submit get a real one for it

    // add to state
    setTempPhotos((prevState) => [...imageUrlArray, ...prevState]);
  };

  const submitPhotos = async () => {
    console.log('before: ', tempPhotoObjects.current);

    // match ref and state
    tempPhotoObjects.current = tempPhotoObjects.current.filter((fileObj) =>
      tempPhotos.some((browserUrl) => browserUrl === fileObj.url)
    );
    console.log('after: ', tempPhotoObjects.current);

    // generate presigned Urls for S3
    // create payload without file just metadata
    const tempPhotosMetadata = tempPhotoObjects.current.map((obj) => ({
      fileType: obj.image.type,
      url: obj.url,
      imageId: obj.imageId,
    }));
    const presignedUrls = await generatePresignedS3Urls(
      userId,
      tempPhotosMetadata
    );
    console.log('presignedUrls: ', presignedUrls);

    presignedUrls.map(async (obj) => {
      const { imageId, uploadURL } = obj;
      // fetch image
      const element = tempPhotoObjects.current.find(
        (refObj) => refObj.imageId === imageId
      );
      console.log('obj: ', element);
      console.log('file: ', element.image);
      console.log('uploadURL: ', uploadURL);
      // Upload images into S3 for each url
      await postPhotoToS3(uploadURL, element.image);
    });
    setTempPhotos([]);
    togglePhotosOpen();
  };

  return (
    <div className='flex flex-col border-b py-4'>
      <div className='flex justify-between mb-3'>
        <p className='text-black'>
          {photosOpen ? 'Current Pictures' : 'Pictures'}
        </p>
        <button className='underline' onClick={cancelPhotos}>
          {photosOpen ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {photosOpen ? (
        <div className='flex flex-col'>
          <div className='flex flex-col space-y-4'>
            <Carousel
              width='150'
              remove={true}
              state={photos}
              setState={setPhotos}
            />
            <p>
              Click the button below to showoff pictures of your work from your
              camera roll!
            </p>
            <label
              htmlFor='fileInput'
              className=' w-full h-40 flex flex-col items-center justify-center cursor-pointer bg-neutral-100 text-black border rounded-lg font-semibold'
            >
              <Camera size='40' />
              <p>Select Photos!</p>
            </label>
            <input
              id='fileInput'
              type='file'
              accept='image/*'
              multiple
              onChange={addPhoto}
              style={{ display: 'none' }}
            />
            {tempPhotos.length > 0 && (
              <p className='font-semibold text-black'>New pictures:</p>
            )}
            <Carousel
              width='150'
              remove={true}
              state={tempPhotos}
              setState={setTempPhotos}
            />
          </div>
          {photosErrorOpen && (
            <p className='mt-2 text-xs text-red-500 italic'>
              Invalid email address. Please enter a valid email.
            </p>
          )}
          <button
            className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
            onClick={submitPhotos}
          >
            {photosOpen && photosStoreLoading ? <PulseLoader /> : 'Save'}
          </button>
        </div>
      ) : (
        <Carousel state={photos} width='150' />
      )}
    </div>
  );
};

export default PicturesComponent;
