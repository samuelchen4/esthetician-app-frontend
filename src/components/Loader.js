import React from 'react';

const Loading = ({ loading, prompt }) => {
  if (!loading) return null;

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center bg-gray-400 bg-opacity-30 z-50'>
      <div className='flex space-x-2 mb-4'>
        <div
          className='w-3 h-3 bg-primary-600 rounded-full animate-bounce'
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className='w-3 h-3 bg-primary-600 rounded-full animate-bounce'
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className='w-3 h-3 bg-primary-600 rounded-full animate-bounce'
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
      {prompt && <div className='text-primary-600 text-center'>{prompt}</div>}
    </div>
  );
};

export default Loading;
