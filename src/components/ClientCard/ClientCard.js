import React, { useState } from 'react';
import Carousel from 'src/components/Carousel';
import { Dot, Heart, Star, StarHalf } from 'lucide-react';
import { cn, truncateToOneDecimal } from 'src/lib/utils';

const ClientCard = ({
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
  const [liked, setLiked] = useState(false);

  const handleLiked = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <div
      id='card-container'
      className='relative w-full max-h-70 flex flex-col border text-xs text-gray-500 border-gray-300 rounded-lg shadow-md font-nunito sm:max-w-[350px]'
    >
      <button
        onClick={handleLiked}
        className='z-40 absolute top-3 right-3 border border-gray-400 p-1.5 rounded-full shadow-sm bg-white text-black'
      >
        <Heart
          size='20'
          className={cn(liked && 'fill-primary stroke-primary')}
        />
      </button>
      <div className='relative'>
        <Carousel
          state={images}
          width={150}
          className='px-0 py-0 rounded-t-lg'
          //   imageClassName="border-2 rounded-lg border-black"
        />
      </div>
      <div className=' relative mx-4 mt-5 mb-4 grow'>
        <img
          src={profilePicture}
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
              {/* <Star size='12' className='text-yellow-400 ' /> */}
              {/* <Star size='12' className='text-yellow-400 ' /> */}
              {/* <StarHalf size='12' className='text-yellow-400 ' /> */}
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
  );
};

export default ClientCard;
