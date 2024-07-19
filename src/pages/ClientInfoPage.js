import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../api/api-config';
import CircleImage from '../components/CircleImage';
import ServiceCard from '../components/ServiceCard';

const ClientInfoPage = () => {
  const { clientId } = useParams(); // Extract clientId from URL
  const locationRouter = useLocation();
  const { first_name, last_name, services, profile_picture } =
    locationRouter.state || {};
  console.log(locationRouter);
  useEffect(() => {
    async function getClientInfo() {
      const { data } = await api.get(`/api/client-info/${clientId}`);
      console.log(data.data);
      setProducts(data.data);
    }

    getClientInfo();
  }, []);

  const [products, setProducts] = useState([]);

  // Renders service cards
  const renderProductCards = useMemo(() => {
    const productCardsArr = products.map((product, index) => {
      const { name: title, price, description = '' } = product;
      return (
        <ServiceCard
          key={index}
          title={title}
          price={price}
          description={description}
        />
      );
    });
    return productCardsArr;
  }, [products]);

  return (
    <div
      id='page-container'
      className='my-4 mx-6 flex flex-col text-sm text-body-text-grey'
    >
      <div id='client-header-container' className='flex flex-col mb-10'>
        {/* <div id='client-title-container' className='flex justify-between'> */}
        <div id='client-title-info' className='flex space-x-6'>
          <CircleImage
            // src='/static/client-card-profile-picture.png'
            src={profile_picture}
            alt='client-profile-picture'
            size='100'
          />
          <div className='grow flex flex-col justify-between'>
            <h3 className='mb-2 text-2xl font-bold tracking-wide'>
              {first_name} {last_name}
            </h3>
            <p className='text-blue-500'>{services}</p>
          </div>
        </div>
        {/* <button className=' border rounded-lg bg-primary border-primary text-white'>
            Book an appointment
          </button> */}
        {/* </div> */}
      </div>
      <div
        id='sections-container'
        className='flex justify-center space-x-4 border-b-2 mb-10'
      >
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
      <div
        id='example-work-container'
        className='grid grid-cols-[repeat(1,minmax(300px,350px))] sm:grid-cols-[repeat(2,minmax(300px,350px))] lg:grid-cols-[repeat(3,minmax(300px,350px))] gap-4 mx-auto'
      >
        {renderProductCards}
      </div>
    </div>
  );
};

export default ClientInfoPage;
