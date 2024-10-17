import React from 'react';
import { cn } from 'src/lib/utils';

// Parent needs to have a dimensions
const PulseLoader = ({ size = '5', className }) => {
  return (
    <div
      id='outer-container'
      className={cn('flex justify-center items-center space-x-2', className)}
    >
      <div className='bg-white rounded-full w-1 h-1 animate-pulse'></div>
      <div className='bg-white rounded-full w-1 h-1 animate-pulse delay-300'></div>
      <div className='bg-white rounded-full w-1 h-1 animate-pulse delay-500'></div>
    </div>
  );
};

export default PulseLoader;
