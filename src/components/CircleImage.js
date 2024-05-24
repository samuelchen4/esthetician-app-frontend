import React from 'react';

const CircleImage = ({ src, alt, size = '40' }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      style={style}
      className='rounded-full overflow-hidden flex justify-center items-center'
    >
      <img src={src} alt={alt} className='w-full h-auto object-none' />
    </div>
  );
};

export default CircleImage;
