import React, { useState, useEffect } from 'react';
import api from '../api/api-config';
import { Link } from 'react-router-dom';
import ClientCard from '../components/ClientCard';
import Modal from '../components/Modal';
import { categories } from '../constants/categories';
import { Calendar } from 'src/components/ui/calendar';

const MarketplacePage = () => {
  const [clientData, setClientData] = useState([]);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleServiceModal = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const handleDatePickerModal = () => {
    setIsDateOpen(!isDateOpen);
  };

  useEffect(() => {
    console.log(isServiceOpen);
  }, [isServiceOpen]);

  useEffect(() => {
    const fetchClientCardData = async () => {
      const config = {};

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
      return (
        <div className='my-1 min-w-[200px] sm:max-w-[350px]'>
          <Link
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
          >
            <ClientCard
              name={name}
              title={title}
              location={'NW'}
              price={cost}
              avaliability={avaliability}
              picture={profile_picture}
            />
          </Link>
        </div>
      );
    });
    return clientCards;
  };

  return (
    <div
      id='page-container'
      className='grow mx-6 flex flex-col text-neutral-600'
    >
      <h2 className='text-center my-5 font-bold text-5xl font-alexandria text-black'>
        Explore
        <span className='text-primary block md:inline-block md:ml-4'>
          Marketplace
        </span>
      </h2>
      <div
        id='search-container'
        className='text-sm flex my-3 space-x-2 justify-center'
      >
        {/* <button className='text-black border border-black py-1 px-5 rounded-3xl hover:text-white hover:border-primary hover:bg-primary'>
          Map
        </button> */}
        <button
          onClick={handleDatePickerModal}
          className='text-black border border-black py-1 px-5 rounded-3xl hover:text-white hover:border-primary hover:bg-primary'
        >
          DatePicker
        </button>
        <button
          onClick={handleServiceModal}
          className='text-black border border-black py-1 px-5 rounded-3xl hover:text-white hover:border-primary hover:bg-primary'
        >
          Service
        </button>
      </div>
      {isDateOpen && (
        <Modal isOpen={isDateOpen} onClose={handleDatePickerModal}>
          <p className='font-bold self-start'>Calendar</p>
          <Calendar
            mode='range'
            disabled={{ before: new Date() }}
            showOutsideDays={false}
            numberOfMonths={12}
            pagedNavigation
            selected={date}
            onSelect={setDate}
            className='rounded-md border-2 w-full overflow-y-scroll no-scrollbar'
          />
        </Modal>
      )}

      {isServiceOpen && (
        <Modal isOpen={isServiceOpen} onClose={handleServiceModal}>
          <h4 className='font-bold'>Category types</h4>
          <div className='flex flex-wrap space-x-3 items-center'>
            {categories.map((category) => (
              <button className='px-4 py-1 my-1.5 rounded-2xl border border-black'>
                {category}
              </button>
            ))}
          </div>
        </Modal>
      )}
      <div
        id='client-container'
        className='flex flex-col items-center sm:flex-row sm:flex-wrap sm:space-x-2 sm:justify-center'
      >
        {renderCards()}
      </div>
    </div>
  );
};

export default MarketplacePage;
