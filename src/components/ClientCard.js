import React from 'react';
import CircleImage from './CircleImage';

const ClientCard = ({
  name,
  title,
  location,
  price,
  avaliability,
  picture,
  width = '350',
  height = '400',
}) => {
  const size = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div
      id='card-container'
      style={size}
      className='flex flex-col border rounded-lg text-xs shadow-sm transform transition hover:scale-[102%]'
    >
      <div id='title-picture-container' className='w-1/2 h-3/5 flex'>
        <img
          src='/static/client-card-title-picture-1.png'
          alt='example work 1'
          className='rounded-tl-lg object-cover'
        />
        <img
          src='/static/client-card-title-picture-2.png'
          alt='example work 2'
          className='rounded-tr-lg object-cover'
        />
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
          minim
        </p>
      </div>
    </div>
  );
};

export default ClientCard;
