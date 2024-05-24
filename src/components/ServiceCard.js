import React from 'react';

const ServiceCard = ({ title, price = 0, description = '' }) => {
  return (
    <div className=' border rounded-md p-4 flex flex-col bg-background-grey-400'>
      <div className='flex justify-between mb-4'>
        <p className='font-semibold'>{title}</p>
        <p>Starting at ${price}.00</p>
      </div>
      <p className='mb-4 text-xs'>{description}</p>
      <button className='border border-primary rounded-sm bg-primary text-white py-2 px-4 self-end mt-auto'>
        Book Now
      </button>
    </div>
  );
};

export default ServiceCard;
