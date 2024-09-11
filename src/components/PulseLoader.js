import React from 'react';

// Parent needs to have a dimensions
const PulseLoader = ({ size = '5' }) => {
  return (
    <div
      id='outer-container'
      className='flex justify-center items-center space-x-2'
    >
      <div className='bg-white rounded-full w-1 h-1 animate-pulse'></div>
      <div className='bg-white rounded-full w-1 h-1 animate-pulse delay-300'></div>
      <div className='bg-white rounded-full w-1 h-1 animate-pulse delay-500'></div>
    </div>
  );
};

export default PulseLoader;
