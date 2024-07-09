import React, { useState, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';

const Carousel = ({ images, size }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const [index, setIndex] = useState(0);
  const bind = useDrag((state) => {
    const {
      swipe: [swipeX],
    } = state;
    if (swipeX === 1) {
      console.log('Swiped right');
      decreaseIndex();
    } else if (swipeX === -1) {
      console.log('Swipe left');
      increaseIndex();
    }
  });

  useEffect(() => {
    console.log(index);
  }, [index]);

  const increaseIndex = () => {
    if (index === images.length - 2.5) return;
    setIndex((prevIndex) =>
      images.length - prevIndex - 3 === 0 ? prevIndex + 0.5 : prevIndex + 1
    );

    // handle reaching the last index
  };

  const decreaseIndex = () => {
    if (index === 0) return;
    setIndex((prevIndex) =>
      images.length - prevIndex - 2.5 === 0 ? prevIndex - 0.5 : prevIndex - 1
    );

    // handle reaching the last index
  };

  return (
    <div id='carousel-container' {...bind()} className='p-2 touch-none'>
      <div className='overflow-x-hidden touch-none'>
        <div
          className='flex transition-transform duration-500 ease-in-out space-x-2'
          style={{
            transform: `translateX(-${index * size}px)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`image ${index}`}
              style={style}
              className='inline-block touch-none rounded-md border object-fill'
            />
          ))}
        </div>
      </div>
      {/* <button onClick={decreaseIndex}>change index</button>
      <button onClick={increaseIndex}>change index</button> */}
    </div>
  );
};

export default Carousel;
