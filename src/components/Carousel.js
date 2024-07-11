import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';

const Carousel = ({ images, size }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  // const bind = useDrag(({ down, movement: [mx], swipe: [swipeX] }) => {
  //   if (!down) {
  //     if (swipeX === 1) {
  //       decreaseIndex();
  //     } else if (swipeX === -1) {
  //       increaseIndex();
  //     } else {
  //       snapToClosestIndex(mx);
  //     }
  //   }
  // });

  // useEffect(() => {
  //   console.log(index);
  // }, [index]);

  // useEffect(() => {
  //   console.log(containerRef.current.clientWidth);
  // }, []);

  const handleMouseDown = (e) => {
    const carousel = containerRef.current;
    carousel.isDown = true;
    carousel.startX = e.pageX - carousel.offsetLeft;
    carousel.scrollLeft = carousel.scrollLeft;
  };

  const handleMouseLeave = () => {
    const carousel = containerRef.current;
    carousel.isDown = false;
  };

  const handleMouseUp = () => {
    const carousel = containerRef.current;
    carousel.isDown = false;
  };

  const handleMouseMove = (e) => {
    const carousel = containerRef.current;
    if (!carousel.isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - carousel.startX) * 3; // Scroll-fast
    carousel.scrollLeft = carousel.scrollLeft - walk;
  };

  return (
    <div
      id='carousel-container'
      className='p-2 flex overflow-x-scroll space-x-1 no-scrollbar'
    >
      {images.map((image, idx) => (
        <img
          key={idx}
          src={image}
          alt={`image ${idx}`}
          className='w-[35%] aspect-1 object-cover rounded-md border z-100'
        />
      ))}
    </div>
  );
};

export default Carousel;
