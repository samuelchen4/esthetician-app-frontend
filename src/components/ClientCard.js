import React from 'react';
import CircleImage from './CircleImage';
import Carousel from './Carousel';

const images = [
  '/static/client-card-title-picture-1.png',
  '/static/client-card-title-picture-2.png',
  '/static/client-card-profile-picture-2.png',
  '/static/client-card-profile-picture.png',
  '/static/beauty_connect_logo_2_compressed.png',
  '/static/client-card-profile-picture-3.png',
];

const ClientCard = ({
  name,
  services,
  location,
  avaliability,
  picture,
  priceRange,
}) => {
  return (
    <div
      id='card-container'
      className='w-full flex flex-col flex-auto border rounded-lg text-xs shadow-md my-2'
    >
      <div id='title-picture-container' className='w-full'>
        <Carousel images={images} />
      </div>
      <div
        id='card-details-container'
        className='flex flex-col justify-between p-4'
      >
        <div
          id='card-title'
          className='flex justify-between border-b pb-4 mb-2'
        >
          <CircleImage src={picture} alt='profile picture' size='70' />
          <div
            id='client-title-details'
            className='grow ml-3 flex flex-col justify-between'
          >
            <p className='text-lg font-bold text-black'>{name}</p>
            <p className=' text-blue-500'>{services}</p>
            <div className='flex justify-between text-xs'>
              <p>Location: {location}</p>
              <p>Cost: {priceRange}</p>
              <p>Avaliability: {avaliability}</p>
            </div>
          </div>
        </div>
        <p className='pt-4'>
          Sint aliquip nulla ad cillum ex eiusmod proident cupidatat aliqua sit
          minim Sint aliquip nulla ad cillum ex eiusmod proident cupidatat
          aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod proident
          cupidatat aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod
          proident cupidatat aliqua sit minim
        </p>
      </div>
    </div>
  );
};

export default ClientCard;
