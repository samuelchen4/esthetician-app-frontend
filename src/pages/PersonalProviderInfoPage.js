import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Camera } from 'lucide-react';
import PulseLoader from 'src/components/PulseLoader';
import useServicesStore from 'src/stores/useServicesStore';
import useSchedulesStore from 'src/stores/useSchedulesStore';
import usePhotosStore from 'src/stores/usePhotosStore';
import servicesConstant from 'src/constants/categories';
import schedulesConstant from 'src/constants/days';
import Carousel from 'src/components/Carousel';
import { cn } from 'src/lib/utils';
import { generatePresignedS3Urls, postPhotoToS3 } from 'src/api/photosApi';

const PersonalProviderInfoPage = () => {
  // React Router
  const navigate = useNavigate();
  const { userId: _id } = useParams();

  // Zustand
  const servicesStore = useServicesStore((state) => state.services);
  const servicesStoreLoading = useServicesStore((state) => state.isLoading);
  const postServicesStore = useServicesStore((state) => state.postServices);
  const photosStore = usePhotosStore((state) => state.photos);
  const photosStoreLoading = usePhotosStore((state) => state.isLoading);
  const schedulesStore = useSchedulesStore((state) => state.schedules);
  const schedulesStoreLoading = useSchedulesStore((state) => state.isLoading);
  const postSchedulesStore = useSchedulesStore((state) => state.postSchedules);

  const renderServices = useCallback(() => {
    const serviceNamesArray = servicesStore?.map(
      (servicesObj) => servicesObj.service_name
    );
    console.log('serviceNamesArray: ', serviceNamesArray);
    setServices(serviceNamesArray);
  }, [servicesStore]);

  const renderPhotos = useCallback(() => {
    const photosUrlArray = photosStore?.map((photosObj) => {
      return photosObj.image_url;
    });
    setPhotos(photosUrlArray);
  }, [photosStore]);

  const renderSchedules = useCallback(() => {
    const schedulesDayArray = schedulesStore?.map(
      (schedulesObj) => schedulesObj.day
    );
    setSchedules(schedulesDayArray);
  }, [schedulesStore]);

  const toggleServicesOpen = () => {
    if (servicesErrorOpen === true) {
      setServicesErrorOpen(false);
    }
    setServicesOpen(!servicesOpen);
  };

  const cancelServices = () => {
    renderServices();
    toggleServicesOpen();
  };

  const handleServicesClick = (e) => {
    const included = services.includes(e.target.value);
    const value = e.target.value;

    // If services state does not include, add
    if (included === false) {
      setServices((prevState) => {
        return [value, ...prevState];
      });
      // If services state includes, remove
    } else {
      setServices((prevState) => {
        const updatedArray = prevState.filter((service) => service !== value);
        return updatedArray;
      });
    }
  };

  const submitServices = async () => {
    // Post the new services into DB
    console.log('starting submit');
    await postServicesStore(_id, services);
    console.log('ending submit');

    toggleServicesOpen();
  };

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
      _id,
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

  const toggleSchedulesOpen = () => {
    if (schedulesErrorOpen === true) {
      setSchedulesErrorOpen(false);
    }
    setSchedulesOpen(!schedulesOpen);
  };

  const cancelSchedules = () => {
    renderSchedules();
    toggleSchedulesOpen();
  };

  const handleSchedulesClick = (e) => {
    const included = schedules.includes(e.target.value);
    const value = e.target.value;

    // If services state does not include, add
    if (included === false) {
      setSchedules((prevState) => {
        return [value, ...prevState];
      });
      // If services state includes, remove
    } else {
      setSchedules((prevState) => {
        const updatedArray = prevState.filter((day) => day !== value);
        return updatedArray;
      });
    }
  };

  const submitSchedules = async () => {
    await postSchedulesStore(_id, schedules);

    toggleSchedulesOpen();
  };

  //  local state
  const [services, setServices] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesErrorOpen, setServicesErrorOpen] = useState(false);

  const [photos, setPhotos] = useState([]);
  const [tempPhotos, setTempPhotos] = useState([]);
  const tempPhotoObjects = useRef([]);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [photosErrorOpen, setPhotosErrorOpen] = useState(false);

  const [schedules, setSchedules] = useState([]);
  const [schedulesOpen, setSchedulesOpen] = useState(false);
  const [schedulesErrorOpen, setSchedulesErrorOpen] = useState(false);

  useEffect(() => {
    if (servicesStore !== null) {
      renderServices();
    }

    if (photosStore !== null) {
      renderPhotos();
    }

    if (schedulesStore !== null) {
      renderSchedules();
    }
  }, [
    servicesStore,
    photosStore,
    schedulesStore,
    renderServices,
    renderPhotos,
    renderSchedules,
  ]);

  return (
    <div className='py-2 mx-4 flex flex-col text-neutral-600 text-sm overflow-y-auto'>
      <ChevronLeft
        size='22'
        className='text-black mt-3 mb-10'
        onClick={() => navigate(-1)}
      />
      <h2 className='text-black font-semibold text-lg mb-5'>Provider Info</h2>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between mb-2'>
          <p className='text-black font-semibold'>Services</p>
          <button className='underline' onClick={cancelServices}>
            {servicesOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {servicesOpen ? (
          <div className='flex flex-col'>
            <p className='mb-3'>
              Click a service to select or deselect it. Selected services are
              highlighted, making it easy to manage your offerings.
            </p>
            <div className='flex flex-wrap items-start'>
              {servicesConstant.map((service) => (
                <button
                  value={service}
                  className={cn(
                    'py-2 px-4 mx-1 my-1 border rounded-full font-semibold shadow-md ',
                    services?.includes(service)
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  )}
                  onClick={handleServicesClick}
                >
                  {service}
                </button>
              ))}
            </div>
            <button
              className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
              onClick={submitServices}
            >
              {servicesOpen && servicesStoreLoading ? <PulseLoader /> : 'Save'}
            </button>
          </div>
        ) : (
          <p>{services.join(', ')}</p>
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Pictures</p>
          <button className='underline' onClick={cancelPhotos}>
            {photosOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {photosOpen ? (
          <div className='flex flex-col'>
            <div className='flex flex-col space-y-4 mt-2'>
              <p>
                Click the button below to showoff pictures of your work from
                your camera roll!
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
                <p className='font-semibold text-black'>New photos!</p>
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
          <Carousel state={photos} width='125' />
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Availability</p>
          <button className='underline' onClick={cancelSchedules}>
            {schedulesOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {schedulesOpen ? (
          <div className='flex flex-col'>
            <p className='mb-3'>
              Click a day to select or deselect it. Selected days are
              highlighted, making it easy to manage your offerings.
            </p>
            <div className='flex flex-wrap items-start'>
              {schedulesConstant.map((day) => (
                <button
                  value={day}
                  className={cn(
                    'py-2 px-4 mx-1 my-1 border rounded-full font-semibold shadow-md ',
                    schedules.includes(day)
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  )}
                  onClick={handleSchedulesClick}
                >
                  {day}
                </button>
              ))}
            </div>

            <button
              className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
              onClick={submitSchedules}
            >
              {schedulesOpen && schedulesStoreLoading ? (
                <PulseLoader />
              ) : (
                'Save'
              )}
            </button>
          </div>
        ) : (
          <p>{schedules.join(', ')}</p>
        )}
      </div>
      <div className='mt-20 flex flex-col items-center space-y-3'>
        <p>Click this button to see what your profile looks like!</p>
        <button className='px-4 py-2 border border-gray-500 bg-black text-white font-semibold rounded-full'>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default PersonalProviderInfoPage;
