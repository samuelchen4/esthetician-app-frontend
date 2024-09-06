import React from 'react';
// import Image from 'src/components/Image';

const Carousel = ({ images = null, aspect = 1, width = 35 }) => {
  return (
    <div
      id='carousel-container'
      className='p-2 flex overflow-x-scroll space-x-2 no-scrollbar'
    >
      {images.map((image, idx) => (
        // <Image src={image} alt={`image ${idx}`} width={width} aspect={aspect} />
        <img
          key={idx}
          src={image}
          alt={`image ${idx}`}
          className={'object-cover rounded-md border'}
          style={{
            width: `${width}px`, // Set width using inline style in pixels
            aspectRatio: aspect, // Set the aspect ratio using inline style
          }}
        />
      ))}
    </div>
  );
};

export default Carousel;
