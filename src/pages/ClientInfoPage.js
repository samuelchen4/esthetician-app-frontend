import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../api/api-config';
import CircleImage from '../components/CircleImage';
import ServiceCard from '../components/ServiceCard';
import Carousel from 'src/components/Carousel';
import {
  getPhotosById,
  getSchedulesById,
  getServicesById,
  getUserInfoById,
} from 'src/api/usersApi';

// STEPS FOR FINISHING CLIENT INFO PAGE
// 1) Fetch all relevent data on render
// 1. Make seperate calls for each piece of data. users table, photos, services, user_schedule
// 2. Use promise.all settled to concurrently fetch data bc we only need the _id
// 3. Add skeletons for each piece and have it load in using useSuspense
// 2) add jsx for the different sections based on wireframe
// 3) add local state

// Days of the week
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Make an api call for this info
const images = [
  '/static/client-card-title-picture-1.png',
  '/static/client-card-title-picture-2.png',
  '/static/client-card-profile-picture-2.png',
  '/static/client-card-profile-picture.png',
  '/static/beauty_connect_logo_2_compressed.png',
  '/static/client-card-profile-picture-3.png',
];

const ClientInfoPage = () => {
  const { userId } = useParams(); // Extract clientId from URL
  const locationRouter = useLocation();
  const { first_name, last_name, profile_picture } = locationRouter.state || {};
  console.log(locationRouter);

  const [userInfo, setUserInfo] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [services, setServices] = useState([]);

  // testing, delete when done
  useEffect(() => {
    console.log('userInfo State: ', userInfo);
    console.log('schedules State: ', schedules);
    console.log('photos State: ', photos);
    console.log('services State: ', services);
  }, [userInfo, schedules, photos, services]);

  useEffect(() => {
    async function fetchData() {
      const [userInfoApi, photosApi, schedulesApi, servicesApi] =
        await Promise.allSettled([
          getUserInfoById(userId),
          getPhotosById(userId),
          getSchedulesById(userId),
          getServicesById(userId),
        ]);

      // Update state only if the promise is fulfilled
      if (userInfoApi.status === 'fulfilled') setUserInfo(userInfoApi.value);
      if (photosApi.status === 'fulfilled') setPhotos(photosApi.value);
      if (schedulesApi.status === 'fulfilled') setSchedules(schedulesApi.value);
      if (servicesApi.status === 'fulfilled') setServices(servicesApi.value);
    }

    fetchData();
  }, [userId]);

  const {
    first_name: firstName = '',
    last_name: lastName = '',
    phone_number: phone = '',
    email = '',
    location = '',
    city = '',
    province = '',
    user_story: userStory = '',
  } = userInfo || {};

  return (
    <div
      id='client-info-container'
      className=' relative p-6 flex flex-col text-center items-center text-sm'
    >
      <div className=' absolute top-0 left-0 right-0 w-full h-32 rounded-b-[50%] bg-blue-200 p-4'>
        <div id='client-info-header' className=' border'>
          <div className=' flex justify-between'>
            <p>back</p>
            <p>
              {city || 'Calgary'}, {province || 'AB'}
            </p>
          </div>
          <div className='absolute border flex flex-col justify-center items-center inset-x-0 top-20 px-4 pb-4'>
            <CircleImage size={80} src={profile_picture} />
            <h3 className='font-bold mt-1'>
              {firstName} {lastName}
            </h3>
            <p className='text-blue-400 text-xs mt-0.5'>
              {services.map((serviceObj) => `${serviceObj.name}`)}
            </p>
            <div id='client-info-action-buttons' className='mt-10 space-x-3'>
              <button className='border rounded-full py-2 px-4 bg-blue-200'>
                IG
              </button>
              <button className='border rounded-full py-2 px-4 bg-blue-200'>
                Book Now
              </button>
            </div>
            <div
              id='client-info-availability'
              className='w-full mt-10 flex flex-col'
            >
              <h3 className='font-bold self-start mb-1'>My Availability</h3>
              <div className='flex justify-between border rounded-md py-1 px-4'>
                {daysOfWeek.map((day) => (
                  <p
                    key={day}
                    className={
                      schedules?.some(
                        (schedulesObj) => schedulesObj.day === day
                      ) // Check if day exists in schedule array
                        ? 'text-blue-500 bold underline' // Apply this class if day is in the schedule array
                        : 'text-gray-400' // Apply no additional class otherwise
                    }
                  >
                    {day.charAt(0)} {/* Display the first letter of the day */}
                  </p>
                ))}
              </div>
            </div>
            <div
              id='client-info-my-work'
              className='w-full mt-10 flex flex-col'
            >
              <h3 className='font-bold self-start mb-1'>My Work</h3>
              <Carousel images={images} aspect={'3/4'} width={'150'} />
            </div>
            <div
              id='client-info-my-story'
              className='w-full mt-10 flex flex-col'
            >
              <h3 className='font-bold self-start mb-1'>My Story</h3>
              <div className='border rounded-md py-1 px-4 text-start'>
                {userStory == false ||
                  `Sint aliquip nulla ad cillum ex eiusmod proident cupidatat
                aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod
                proident cupidatat aliqua sit minim Sint aliquip nulla ad cillum
                ex eiusmod proident cupidatat aliqua sit minim Sint aliquip
                nulla ad cillum ex eiusmod proident cupidatat aliqua sit minim`}
              </div>
              <div
                id='client-info-my-contact'
                className='w-full mt-10 flex flex-col'
              >
                <h3 className='font-bold self-start mb-1'>
                  My Contact Information
                </h3>
                <div className='border rounded-md py-1 px-4 flex flex-col items-start'>
                  <p>
                    <span className='font-semibold mr-1'>Phone:</span>
                    {phone || `403-xxx-xxxx`}
                  </p>
                  <p>
                    <span className='font-semibold mr-1'>Email:</span>
                    {email || `test@gmail.com`}
                  </p>
                  <p>
                    <span className='font-semibold mr-1'>Location:</span>
                    {location || `Calgary, AB`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInfoPage;
