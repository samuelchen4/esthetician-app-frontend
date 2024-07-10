import React, { useState, useRef, useEffect } from 'react';
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
    // width: `${width}px`,
    // height: `${height}px`,
  };

  const containerRef = useRef(null); // Step 1: Create a ref
  const [containerHeight, setContainerHeight] = useState(0); // State to store the height
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {}, []);

  return (
    // <div
    //   id='card-container'
    //   ref={containerRef}
    //   className='w-full h-full flex flex-col flex-auto border rounded-lg text-xs shadow-sm'
    //   // style={{ height: `${containerHeight}px` }}
    // >
    //   <div id='title-picture-container' className='w-full h-[40%]'>
    //     <Carousel images={images} />
    //   </div>
    //   <div
    //     id='card-details-container'
    //     className=' flex flex-col justify-between p-4 border'
    //   >
    //     <div
    //       id='card-title'
    //       className='flex justify-between items-center border mb-2'
    //     >
    //       <CircleImage src={picture} alt='profile picture' size='90' />
    //       <div
    //         id='client-title-details'
    //         className='h-full ml-2 flex flex-col justify-between'
    //       >
    //         <p className='text-lg font-bold text-black'>{name}</p>
    //         <p className=' text-blue-500'>{title}</p>
    //         <div className='flex justify-between text-xs'>
    //           <p>Location: {location}</p>
    //           <p>Cost: {price}</p>
    //           <p>Avaliability: {avaliability}</p>
    //         </div>
    //       </div>
    //     </div>
    //     <p>
    //       Sint aliquip nulla ad cillum ex eiusmod proident cupidatat aliqua sit
    //       minim Sint aliquip nulla ad cillum ex eiusmod proident cupidatat
    //       aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod proident
    //       cupidatat aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod
    //       proident cupidatat aliqua sit minim
    //     </p>
    //   </div>
    // </div>
    <div
      id='card-container'
      ref={containerRef}
      className='w-full flex flex-col flex-auto border rounded-lg text-xs shadow-sm my-2'
    >
      <div id='title-picture-container' className='w-full'>
        <Carousel images={images} />
      </div>
      <div
        id='card-details-container'
        className='flex flex-col justify-between p-4 border'
      >
        <div
          id='card-title'
          className='flex justify-between border-b pb-4 mb-2'
        >
          <CircleImage src={picture} alt='profile picture' size='90' />
          <div
            id='client-title-details'
            className='grow ml-2 sm:ml-4 flex flex-col justify-between'
          >
            <p className='text-lg font-bold text-black'>{name}</p>
            <p className=' text-blue-500'>{title}</p>
            <div className='flex justify-between text-xs'>
              <p>Location: {location}</p>
              <p>Cost: {price}</p>
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
