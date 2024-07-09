import React, { useState, useEffect } from 'react';
import api from '../api/api-config';
import { Link } from 'react-router-dom';
import ClientCard from '../components/ClientCard';
import DatePicker from '../components/DatePicker';

const MarketplacePage = () => {
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    const fetchClientCardData = async () => {
      const config = {
        params: {},
      };

      try {
        const { data } = await api.get(
          '/api/marketplace/client-search',
          config
        );
        console.log(data.data);
        setClientData(data.data);
        // setClientData([data.data[0]]); // Testing to get one card
      } catch (error) {
        console.error('Error fetching client data', error);
      }
    };

    fetchClientCardData();
  }, []);

  // Renders the cards when the state changes
  // array of objects
  const renderCards = () => {
    if (clientData.length === 0) {
      return <p>Add loading skeleton here</p>;
    }

    const clientCards = clientData.map((clientObj) => {
      const {
        user_id: clientId,
        first_name,
        last_name,
        title,
        location,
        cost,
        avaliability = 'MWF',
        profile_picture,
      } = clientObj;
      const name = `${first_name} ${last_name}`;
      // const { name, title, location, price, avaliability, picture } = clientObj;
      return (
        <div className='m-3'>
          {/* <Link
            to={`/client-info/${clientId}`}
            state={{
              clientId,
              first_name,
              last_name,
              title,
              location,
              cost,
              avaliability,
              profile_picture,
            }}
          > */}
          <ClientCard
            name={name}
            title={title}
            location={'NW'}
            price={cost}
            avaliability={avaliability}
            picture={profile_picture}
          />
          {/* </Link> */}
        </div>
      );
    });
    return clientCards;
  };

  return (
    <>
      <div
        id='page-container'
        className='mx-auto flex flex-col items-center text-neutral-600'
      >
        <div id='search-container' className='flex flex-col my-10 items-center'>
          <h2 className='text-center mb-10 font-bold text-5xl font-alexandria text-black'>
            Explore
            <span className='text-primary block md:inline-block md:ml-4'>
              Marketplace
            </span>
          </h2>
          <div className='flex space-x-4'>
            <button className='box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
              Map
            </button>
            <button className='box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
              Professional
            </button>
            <button className='box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
              Service
            </button>
          </div>
          {/* <div className='flex space-x-4'>
            <div id='marketplace-search' className='flex space-x-4'>
              <input
                type='text'
                placeholder='Search'
                className='border bg-background-grey-500 px-4 py-1 rounded-lg w-[600px]'
              />
              <DatePicker />
            </div>

            <div id='marketplace-sort' className='flex items-center'>
              <p className='mr-1'>Sort By:</p>
              <select className='border px-4 py-1 rounded-lg'>
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div> */}
        </div>
        <div
          id='client-container'
          className='flex flex-col md:flex-row md:flex-wrap justify-center'
        >
          {renderCards()}
        </div>
      </div>
    </>
  );
};

export default MarketplacePage;
