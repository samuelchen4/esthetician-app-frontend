import React from 'react';
import { X } from 'lucide-react';
import Image from 'src/components/Image';
// import Image from 'src/components/Image';

const Carousel = ({
  state = null,
  setState = null,
  aspect = 1,
  width = 35,
  remove = false,
}) => {
  // return error if remove true but no state and setState
  if (remove === true && (!state || !setState)) {
    throw new Error(
      'Remove property needs to have valid state and setState props!'
    );
  }

  const removePicture = (e) => {
    // console.log('Remove picture clicked!');
    const imageToRemove = e.currentTarget.dataset.src;
    // console.log('imageToRemove: ', imageToRemove);

    const updatedState = state.filter((image) => image !== imageToRemove);

    setState(updatedState);
  };

  return (
    <div
      id='carousel-container'
      className='p-2 flex overflow-x-scroll space-x-2 no-scrollbar'
    >
      {state.map((image, idx) => (
        <div className='relative flex-shrink-0'>
          <Image src={image} alt={`image ${idx}`} width={width} />
          {remove && (
            <button
              data-src={image}
              onClick={removePicture}
              className='absolute top-2 right-2 border p-1 rounded-full bg-blue-100 shadow-sm'
            >
              <X size='14' className='text-black font-bold' />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Carousel;
