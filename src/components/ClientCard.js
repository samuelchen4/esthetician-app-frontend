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
  title,
  location,
  price,
  avaliability,
  picture,
  width = '375',
  height = '450',
  // width = '400',
  // height = '500',
}) => {
  const size = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div
      id='card-container'
      style={size}
      className='w-full h-auto flex flex-col border rounded-lg text-xs shadow-sm'
    >
      <div id='title-picture-container' className='w-full h-1/3'>
        <Carousel images={images} size={120} />
      </div>
      <div
        id='card-details-container'
        className='grow flex flex-col justify-between m-4 box-border'
      >
        <div id='card-title' className='flex justify-between items-center'>
          <CircleImage src={picture} alt='profile picture' size='65' />
          <div
            id='client-title-details'
            className='ml-2 grow h-[95%] flex flex-col justify-between'
          >
            <p className='text-lg font-bold text-black'>{name}</p>
            <p className=' text-blue-500 mb-0.5'>{title}</p>
            <div className='flex justify-between text-xs'>
              <p>Location: {location}</p>
              <p>Cost: {price}</p>
              <p>Avaliability: {avaliability}</p>
            </div>
          </div>
        </div>
        <p className=''>
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
