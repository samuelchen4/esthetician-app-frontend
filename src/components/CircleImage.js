import React from 'react';
import { cn } from 'src/lib/utils';

const CircleImage = ({ src, alt, size = '40', className }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div
      style={style}
      className={cn(
        'rounded-full overflow-hidden flex justify-center items-center',
        className
      )}
    >
      <img src={src} alt={alt} className='w-full h-full object-fit' />
    </div>
  );
};

export default CircleImage;
