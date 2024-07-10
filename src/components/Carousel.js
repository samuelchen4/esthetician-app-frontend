// import React, { useState, useRef, useEffect } from 'react';
// import { useDrag } from '@use-gesture/react';

// const Carousel = ({ images, size }) => {

//   const [index, setIndex] = useState(0);
//   const bind = useDrag((state) => {
//     const {
//       swipe: [swipeX],
//     } = state;
//     if (swipeX === 1) {
//       console.log('Swiped right');
//       decreaseIndex();
//     } else if (swipeX === -1) {
//       console.log('Swipe left');
//       increaseIndex();
//     }
//   });

//   useEffect(() => {
//     console.log(index);
//   }, [index]);

//   const increaseIndex = () => {
//     if (index === images.length - 2.5) return;
//     setIndex((prevIndex) =>
//       images.length - prevIndex - 3 === 0 ? prevIndex + 0.5 : prevIndex + 1
//     );

//     // handle reaching the last index
//   };

//   const decreaseIndex = () => {
//     if (index === 0) return;
//     setIndex((prevIndex) =>
//       images.length - prevIndex - 2.5 === 0 ? prevIndex - 0.5 : prevIndex - 1
//     );

//     // handle reaching the last index
//   };

//   return (
//     <div id='carousel-container' {...bind()} className='p-2 touch-none flex'>
//       <div className='overflow-x-hidden touch-none flex'>
//         <div
//           className='flex transition-transform duration-500 ease-in-out space-x-2'
//           style={{
//             transform: `translateX(-${index * size}px)`,
//           }}
//         >
//           {images.map((image, index) => (

//             <img
//               key={index}
//               src={image}
//               alt={`image ${index}`}
//               className='w-[35%] aspect-1 object-cover rounded-md border'
//             />

//           ))}
//         </div>
//       </div>
//       {/* <button onClick={decreaseIndex}>change index</button>
//       <button onClick={increaseIndex}>change index</button> */}
//     </div>
//   );
// };

// export default Carousel;
import React, { useState, useRef, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';

const Carousel = ({ images, size }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef();

  const bind = useDrag(({ down, movement: [mx], swipe: [swipeX] }) => {
    if (!down) {
      if (swipeX === 1) {
        decreaseIndex();
      } else if (swipeX === -1) {
        increaseIndex();
      } else {
        snapToClosestIndex(mx);
      }
    }
  });

  useEffect(() => {
    console.log(index);
  }, [index]);

  const increaseIndex = () => {
    setIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  const decreaseIndex = () => {
    setIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const snapToClosestIndex = (offset) => {
    const distance = offset / size;
    const newIndex = index - Math.round(distance);
    setIndex(Math.max(0, Math.min(images.length - 1, newIndex)));
  };

  return (
    <div id='carousel-container' {...bind()} className='p-2 touch-none flex'>
      <div className='overflow-x-hidden touch-none flex' ref={containerRef}>
        <div
          className='flex transition-transform duration-500 ease-in-out space-x-2'
          style={{
            transform: `translateX(-${index * size}px)`,
          }}
        >
          {images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`image ${idx}`}
              className='w-[35%] aspect-1 object-cover rounded-md border'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
