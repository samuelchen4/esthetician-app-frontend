import React from 'react';
import CircleImage from '../components/CircleImage';

const ClientInfoPage = () => {
  return (
    <div id='page-container' className='my-4 mx-40 border-b-2 flex flex-col'>
      <div id='client-header-container' className='flex flex-col'>
        <div id='client-title-container' className='flex justify-between'>
          <div className='mb-4 flex'>
            <div className='mr-8'>
              <CircleImage
                src='/static/client-card-profile-picture.png'
                alt='client-profile-picture'
                size='150'
              />
            </div>
            <div className='flex flex-col my-auto'>
              <p className='mb-2 text-2xl font-bold'>Teevian Tang</p>
              <p className='mb-8'>Estetician</p>
              <p>facebook</p>
            </div>
          </div>
          <button className='w-[250px] h-[100px] py-2 px-6 my-auto border rounded-lg'>
            Book an appointment
          </button>
        </div>
        <div id='sections-container' className=' mr-auto flex space-x-4'>
          <p className='py-2 px-4'>
            <a href='#'>Work</a>
          </p>
          <p className=' py-2 px-4'>
            <a href='#'>Services</a>
          </p>
          <p className=' py-2 px-4'>
            <a href='#'>Information</a>
          </p>
        </div>
      </div>
      <div id='example-work-container'></div>
    </div>
  );
};

export default ClientInfoPage;
