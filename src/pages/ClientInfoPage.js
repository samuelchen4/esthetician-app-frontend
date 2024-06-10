import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../api/api-config';
import CircleImage from '../components/CircleImage';
import ServiceCard from '../components/ServiceCard';

const ClientInfoPage = () => {
  const { clientId } = useParams(); // Extract clientId from URL
  const locationRouter = useLocation();
  const {
    first_name,
    last_name,
    title,
    location,
    cost,
    avaliability,
    profile_picture,
  } = locationRouter.state || {};
  console.log(locationRouter);
  useEffect(() => {
    async function getClientInfo() {
      const { data } = await api.get(`/api/client-info/${clientId}`);
      console.log(data.data);
      setServiceInfo(data.data);
    }

    getClientInfo();
  }, []);

  const [serviceInfo, setServiceInfo] = useState([]);

  // Renders service cards
  const renderServiceCards = useMemo(() => {
    const serviceCardsArr = serviceInfo.map((info, index) => {
      const { name: title, price, description = '' } = info;
      return (
        <ServiceCard
          key={index}
          title={title}
          price={price}
          description={description}
        />
      );
    });
    return serviceCardsArr;
  }, [serviceInfo]);

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
                // src='/static/client-card-profile-picture.png'
                src={profile_picture}
                alt='client-profile-picture'
                size='150'
              />
            </div>
            <div className='flex flex-col my-auto'>
              <p className='mb-2 text-2xl font-bold'>
                {first_name} {last_name}
              </p>
              <p className='mb-8'>{title}</p>
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
        {renderServiceCards}
      </div>
    </div>
  );
};

export default ClientInfoPage;
