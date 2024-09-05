import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../api/api-config';
import CircleImage from '../components/CircleImage';
import ServiceCard from '../components/ServiceCard';
import Carousel from 'src/components/Carousel';

// STEPS FOR FINISHING CLIENT INFO PAGE
// 1) Fetch all relevent data on render
// 1. Make seperate calls for each piece of data. users table, photos, services, user_schedule
// 2. Use promise.all settled to concurrently fetch data bc we only need the _id
// 3. Add skeletons for each piece and have it load in using useSuspense
// 2) add jsx for the different sections based on wireframe
// 3) add local state

const ClientInfoPage = () => {
  const { clientId } = useParams(); // Extract clientId from URL
  const locationRouter = useLocation();
  const { first_name, last_name, services, profile_picture } =
    locationRouter.state || {};
  console.log(locationRouter);
  const [products, setProducts] = useState([]);

  // Make an api call for this info
  const images = [
    '/static/client-card-title-picture-1.png',
    '/static/client-card-title-picture-2.png',
    '/static/client-card-profile-picture-2.png',
    '/static/client-card-profile-picture.png',
    '/static/beauty_connect_logo_2_compressed.png',
    '/static/client-card-profile-picture-3.png',
  ];

  // useEffect(() => {
  //   async function getClientInfo() {
  //     const { data } = await api.get(`/api/users/client-info/${clientId}`);
  //     console.log('api response: ', data.data);
  //     setProducts(data.data);
  //   }

  //   getClientInfo();
  // }, []);

  // Renders service cards
  // const renderProductCards = useMemo(() => {
  //   const productCardsArr = products.map((product, index) => {
  //     const { name: title, price, description = '' } = product;
  //     return (
  //       <ServiceCard
  //         key={index}
  //         title={title}
  //         price={price}
  //         description={description}
  //       />
  //     );
  //   });
  //   return productCardsArr;
  // }, [products]);

  return (
    <div
      id='client-info-container'
      className=' relative p-6 flex flex-col text-center items-center text-sm'
    >
      <div className=' absolute top-0 left-0 right-0 w-full h-32 rounded-b-[50%] bg-blue-200 p-4'>
        <div id='client-info-header' className=' border'>
          <div className=' flex justify-between'>
            <p>back</p>
            <p>Calgary, Ab</p>
          </div>
          <div className='absolute border flex flex-col justify-center items-center inset-x-0 top-20 px-4 pb-4'>
            <CircleImage size={80} src={profile_picture} />
            <h3 className='font-bold mt-1'>Samuel Chen</h3>
            <p className='text-blue-400 text-xs mt-0.5'>Nails</p>
            <div id='client-info-action-buttons' className='mt-10 space-x-3'>
              <button className='border rounded-full py-2 px-4 bg-blue-200'>
                IG
              </button>
              <button className='border rounded-full py-2 px-4 bg-blue-200'>
                Book Now
              </button>
            </div>
            <div
              id='client-info-availability'
              className='w-full mt-10 flex flex-col'
            >
              <h3 className='font-bold self-start mb-1'>My Availability</h3>
              <div className='flex justify-between border rounded-md py-1 px-4'>
                <p value='Sunday'>S</p>
                <p>M</p>
                <p>T</p>
                <p>W</p>
                <p>T</p>
                <p>F</p>
                <p>S</p>
              </div>
            </div>
            <div
              id='client-info-my-work'
              className='w-full mt-10 flex flex-col'
            >
              <h3 className='font-bold self-start mb-1'>My Work</h3>
              <Carousel images={images} aspect={'3/4'} width={'150'} />
            </div>
            <div
              id='client-info-my-story'
              className='w-full mt-10 flex flex-col'
            >
              <h3 className='font-bold self-start mb-1'>My Story</h3>
              <div className='border rounded-md py-1 px-4 text-start'>
                Sint aliquip nulla ad cillum ex eiusmod proident cupidatat
                aliqua sit minim Sint aliquip nulla ad cillum ex eiusmod
                proident cupidatat aliqua sit minim Sint aliquip nulla ad cillum
                ex eiusmod proident cupidatat aliqua sit minim Sint aliquip
                nulla ad cillum ex eiusmod proident cupidatat aliqua sit minim
              </div>
              <div
                id='client-info-my-contact'
                className='w-full mt-10 flex flex-col'
              >
                <h3 className='font-bold self-start mb-1'>
                  My Contact Information
                </h3>
                <div className='border rounded-md py-1 px-4 flex flex-col items-start'>
                  <p>
                    <span className='font-semibold'>Phone:</span> 403-xxx-xxxx
                  </p>
                  <p>
                    <span className='font-semibold'>Email:</span> test@gmail.com
                  </p>
                  <p>
                    <span className='font-semibold'>Location:</span> Calgary, AB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div
    //   id='page-container'
    //   className='my-4 mx-6 flex flex-col text-sm text-body-text-grey'
    // >
    //   <div id='client-header-container' className='flex flex-col mb-10'>
    //     {/* <div id='client-title-container' className='flex justify-between'> */}
    //     <div id='client-title-info' className='flex space-x-6'>
    //       <CircleImage
    //         // src='/static/client-card-profile-picture.png'
    //         src={profile_picture}
    //         alt='client-profile-picture'
    //         size='100'
    //       />
    //       <div className='grow flex flex-col justify-between'>
    //         <h3 className='mb-2 text-2xl font-bold tracking-wide'>
    //           {first_name} {last_name}
    //         </h3>
    //         <p className='text-blue-500'>{services}</p>
    //       </div>
    //     </div>
    //     {/* <button className=' border rounded-lg bg-primary border-primary text-white'>
    //         Book an appointment
    //       </button> */}
    //     {/* </div> */}
    //   </div>
    //   <div
    //     id='sections-container'
    //     className='flex justify-center space-x-4 border-b-2 mb-10'
    //   >
    //     <button className='py-2 px-4 box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
    //       Work
    //     </button>
    //     <button className='py-2 px-4 box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
    //       Services
    //     </button>
    //     <button className='py-2 px-4 box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
    //       Information
    //     </button>
    //   </div>
    //   <div
    //     id='example-work-container'
    //     className='grid grid-cols-[repeat(1,minmax(300px,350px))] sm:grid-cols-[repeat(2,minmax(300px,350px))] lg:grid-cols-[repeat(3,minmax(300px,350px))] gap-4 mx-auto'
    //   >
    //     {renderProductCards}
    //   </div>
    // </div>
  );
};

export default ClientInfoPage;
