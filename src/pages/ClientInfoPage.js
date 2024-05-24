import React from 'react';
import CircleImage from '../components/CircleImage';
import ServiceCard from '../components/ServiceCard';

const ClientInfoPage = () => {
  const serviceInfoArr = [
    {
      title: 'Full Foils',
      price: 95,
      description:
        'Traditional full head of foils, for those wanting an overall lighter or darker (lowlight) look.',
    },
    {
      title: 'Partial Foil',
      price: 75,
      description:
        'Traditional half head of foils, for those wanting to refresh their highlights or lowlights.',
    },
    {
      title: 'Money piece',
      price: 50,
      description:
        'Face framing highlights, for those wanting a pop of brightness around the face.',
    },
    { title: 'Shampoo Blowout', price: 30 },
    { title: "Men's Haircut", price: 22 },
  ];

  // Renders service cards
  const renderServiceCards = () => {
    const serviceCardsArr = serviceInfoArr.map((info) => {
      const { title, price, description = '' } = info;
      return (
        <ServiceCard title={title} price={price} description={description} />
      );
    });

    return serviceCardsArr;
  };

  return (
    <div
      id='page-container'
      className='my-4 mx-40 flex flex-col text-sm text-body-text-grey'
    >
      <div
        id='client-header-container'
        className='border-b-2 flex flex-col mb-10'
      >
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
          <button className='w-[250px] h-[100px] py-2 px-6 my-auto border rounded-lg bg-primary border-primary text-white'>
            Book an appointment
          </button>
        </div>
        <div id='sections-container' className=' mr-auto flex space-x-4'>
          <button className='py-2 px-4 box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
            Work
          </button>
          <button className='py-2 px-4 box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
            Services
          </button>
          <button className='py-2 px-4 box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
            Information
          </button>
        </div>
      </div>
      <div
        id='example-work-container'
        className=' grid grid-cols-[repeat(2,minmax(300px,350px))] gap-4 mx-auto'
      >
        {renderServiceCards()}
      </div>
    </div>
  );
};

export default ClientInfoPage;
