import React from 'react';
import { Link } from 'react-router-dom';
import ClientCard from '../components/ClientCard';
import DatePicker from '../components/DatePicker';

const MarketplacePage = () => {
  const clientArray = [
    {
      picture: '/static/client-card-profile-picture.png',
      name: 'Teevian Tang',
      title: 'Esthetician',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
    {
      picture: '/static/client-card-profile-picture-2.png',
      name: 'Samuel Chen',
      title: 'Pro Gamer',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
    {
      picture: '/static/client-card-profile-picture-3.png',
      name: 'Crystal Yu',
      title: 'Esthetician',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
    {
      picture: '/static/client-card-profile-picture.png',
      name: 'Teevian Tang',
      title: 'Esthetician',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
    {
      picture: '/static/client-card-profile-picture-2.png',
      name: 'Samuel Chen',
      title: 'Pro Gamer',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
    {
      picture: '/static/client-card-profile-picture-3.png',
      name: 'Crystal Yu',
      title: 'Esthetician',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
    {
      picture: '/static/client-card-profile-picture-2.png',
      name: 'Samuel Chen',
      title: 'Pro Gamer',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
    {
      picture: '/static/client-card-profile-picture-3.png',
      name: 'Crystal Yu',
      title: 'Esthetician',
      price: '$$',
      location: 'NW',
      avaliability: 'MWF',
    },
  ];

  // Renders the cards when the state changes
  // array of objects
  const renderCards = () => {
    const clientCards = clientArray.map((clientObj) => {
      const { name, title, location, price, avaliability, picture } = clientObj;
      return (
        <div className='m-3'>
          <Link to='/client-info'>
            <ClientCard
              name={name}
              title={title}
              location={location}
              price={price}
              avaliability={avaliability}
              picture={picture}
            />
          </Link>
        </div>
      );
    });
    return clientCards;
  };

  return (
    <>
      <div
        id='page-container'
        className='my-4 mx-20 flex flex-col items-center text-neutral-600'
      >
        <div id='search-container' className='flex flex-col my-10 items-center'>
          <h2 className='mb-10 font-bold text-5xl font-alexandria text-black'>
            Explore <span className='text-primary'>Marketplace</span>
          </h2>
          <div className='mb-4 flex justify-between w-[90px]'>
            <button className='box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
              Map
            </button>
            <button className='box-sizing border-b-2 border-b-white hover:text-primary hover:border-b-2 hover:border-b-primary'>
              Client
            </button>
          </div>
          <div className='flex space-x-4'>
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
          </div>
        </div>
        <div
          id='client-container'
          className='flex flex-wrap justify-center min-w-[1200px]'
        >
          {renderCards()}
        </div>
      </div>
    </>
  );
};

export default MarketplacePage;
