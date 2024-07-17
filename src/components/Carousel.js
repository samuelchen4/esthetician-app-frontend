import React from 'react';
const Carousel = ({ images }) => {
  return (
    <div
      id='carousel-container'
      className='p-2 flex overflow-x-scroll space-x-2 no-scrollbar'
    >
      {images.map((image, idx) => (
        <img
          key={idx}
          src={image}
          alt={`image ${idx}`}
          className='w-[35%] aspect-1 object-cover rounded-md border'
        />
      ))}
    </div>
  );
};

export default Carousel;
