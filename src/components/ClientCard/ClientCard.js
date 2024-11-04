import React, { useState, useEffect } from 'react';
import Carousel from 'src/components/Carousel';
import { Dot, Star } from 'lucide-react';
import { truncateToOneDecimal } from 'src/lib/utils';
import { useRouter } from 'src/hooks/useRouter';
import { usePhotos } from 'src/hooks/usePhotos';
import { Link } from 'react-router-dom';
import LikeButton from 'src/components/LikeButton';

const ClientCard = ({
  aestheticianId,
  images, // delete this when done testing
  profilePicture = '/static/blank-profile-picture.png', // delete this when done testing
  firstName,
  lastName,
  userStory,
  location,
  city,
  province,
  postalCode,
  services,
  rating,
  latitude,
  longitude,
  distance,
  photos,
}) => {
  const { goToPage } = useRouter();
  const { imageUrls, profileUrl } = usePhotos(profilePicture, photos);

  return (
    <Link to={`/aestheticians/${aestheticianId}`}>
      <div
        id='card-container'
        className='relative w-full max-h-70 flex flex-col border text-xs text-gray-500 border-gray-300 rounded-lg shadow-md font-nunito sm:max-w-[350px]'
      >
        <LikeButton
          aestheticianId={aestheticianId}
          className='z-40 absolute top-3 right-3'
        />

        <div className='relative'>
          <Carousel
            state={imageUrls}
            width={150}
            className='px-0 py-0 rounded-t-lg'
          />
        </div>
        <div className=' relative mx-4 mt-5 mb-4 grow'>
          <img
            src={profileUrl}
            className='absolute top-[-70px] h-16 w-16 border-2 border-black rounded-full shadow-md object-cover'
          />

          <h5 className='mb-0.5 font-bold text-lg '>
            {firstName} {lastName}
          </h5>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <p className='text-primary font-semibold'>
                {services !== null ? services.join(', ') : 'Specialist'}
              </p>
              <Dot size='20' />
              <div className=' flex items-center'>
                <Star size='12' className='text-yellow-400 ' />
                <p className='ml-0.5 font-semibold'>
                  {rating !== null ? rating : 3.0}
                </p>
              </div>
            </div>
            <p>
              {!location ? 'Calgary, AB' : location}{' '}
              <span className='font-semibold'>
                ({truncateToOneDecimal(distance)} km)
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClientCard;
