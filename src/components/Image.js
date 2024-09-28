import React, { useState } from 'react';
import { Skeleton } from 'src/components/ui/skeleton';

const Image = ({ src, alt, width, aspect = 1 }) => {
  const [loading, setLoading] = useState(true); // State to track loading

  return (
    <>
      {loading && (
        <Skeleton
          style={{
            width: `${width}px`,
            aspectRatio: aspect,
          }}
        />
      )}
      {/* Show skeleton while loading */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)} // Hide skeleton when the image loads
        onError={() => setLoading(false)} // Hide skeleton if there is an error
        style={{
          display: loading ? 'none' : 'inline-block', // Hide image while loading
          width: `${width}px`,
          aspectRatio: aspect,
        }}
        className='object-cover rounded-md border animate-fadeIn'
      />
    </>
  );
};

export default Image;
