import React from 'react';
import { cn } from 'src/lib/utils';

// Display this element instead of page when values are loading
// Goes into the middle of parent element`

const PageLoader = ({ width = 10, className }) => {
  return (
    <div
      className={cn(
        'h-full bg-white flex flex-col justify-center items-center',
        className
      )}
    >
      <div
        id='page-loader'
        className='aspect-1 rounded-full bg-[#F10C49] animate-page-loader'
        style={{
          width: `${width}px`,
        }}
      ></div>
    </div>
  );
};

export default PageLoader;
