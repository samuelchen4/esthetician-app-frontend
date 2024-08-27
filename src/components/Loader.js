import React from 'react';

const Loader = () => {
  return (
    <div
      id='outer-container'
      className='flex justify-center items-center h-full w-full border-4 absolute bg-gray-50 bg-opacity-80'
    >
      {/* <div id='inner-container' className='bg-blue-500 text-white p-4 border-4'> */}
      {/* <h4>Is Loading...</h4> */}
      <div className='flex justify-center items-center space-x-2'>
        <div className='animate-bounce h-2 w-2 bg-blue-300 rounded-full'></div>
        <div className='animate-bounce200 h-2 w-2 bg-blue-400 rounded-full'></div>
        <div className='animate-bounce400 h-2 w-2 bg-blue-500 rounded-full'></div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Loader;
