import React from 'react';

// Parent needs to have a dimensions
const PulseLoader = ({ size = '5' }) => {
  return (
    <div
      id='outer-container'
      className='flex justify-center items-center space-x-2'
    >
      <div
        className={`bg-white rounded-full w-[${size}px] h-[${size}px] animate-pulse`}
      ></div>
      <div
        className={`bg-white rounded-full w-[${size}px] h-[${size}px] animate-pulse delay-500`}
      ></div>
      <div
        className={`bg-white rounded-full w-[${size}px] h-[${size}px] animate-pulse delay-1000`}
      ></div>
    </div>
  );
};

export default PulseLoader;
