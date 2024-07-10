import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';

const Carousel = ({ images, size }) => {
  // const style = {
  //   width: `${size}px`,
  //   height: `${size}px`,
  //   width: '33%',
  // };

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
    <div
      id='carousel-container'
      {...bind()}
      className='w-full h-full p-2 touch-none flex'
    >
      <div className='overflow-x-hidden touch-none flex'>
        <div
          className='flex transition-transform duration-500 ease-in-out space-x-2'
          style={{
            transform: `translateX(-${index * size}px)`,
          }}
        >
          {images.map((image, index) => (
            // <div
            //   className='w-full h-auto'
            //   // style={{ 'min-width': '33%', 'max-height': '100%' }}
            // >
            <img
              key={index}
              src={image}
              alt={`image ${index}`}
              // style={style}
              className='w-[40%] h-full aspect-1 object-cover rounded-md border'
            />
            // </div>
          ))}
        </div>
      </div>
      {/* <button onClick={decreaseIndex}>change index</button>
      <button onClick={increaseIndex}>change index</button> */}
    </div>
  );
};

export default Carousel;
