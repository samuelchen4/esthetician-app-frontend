import React, { useState, useEffect } from 'react';
import api from '../api/api-config';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import ClientCard from '../components/ClientCard';
import Modal from '../components/Modal';
import { categories } from '../constants/categories';
import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar';
import useHeaderStore from 'src/stores/useHeaderStore';

const MarketplacePage = () => {
  const [clientData, setClientData] = useState([]);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [service, setService] = useState('Nails');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [date, setDate] = useState(null);

  // header height store
  const headerHeight = useHeaderStore((state) => state.headerHeight);

  const handleServiceModal = () => {
    setIsServiceOpen(!isServiceOpen);
  };

  const handleDatePickerModal = () => {
    setIsDateOpen(!isDateOpen);
  };

  // Close modal when service is selected
  useEffect(() => {
    setIsServiceOpen(false);
  }, [service]);

  // Close modal when date is selected
  useEffect(() => {
    setIsDateOpen(false);
  }, [date]);

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
        className={cn(
          'text-sm flex mb-5 space-x-2 justify-center sticky',
          `top-[${headerHeight}px] py-2`
        )}
      >
        <Button
          variant={'outline'}
          onClick={handleDatePickerModal}
          className={cn(
            'dark:none w-[225px] h-[40px] justify-start text-left font-normal rounded-2xl',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
        <Button
          variant={'outline'}
          onClick={handleServiceModal}
          className='h-[40px] font-normal rounded-2xl'
        >
          {service ? service : <span>Pick a service</span>}
          <ChevronDown className='ml-1 w-5 h-auto' />
        </Button>
      </div>
      {isDateOpen && (
        <Modal isOpen={isDateOpen} onClose={handleDatePickerModal}>
          <p className='mb-4 font-bold self-start'>Calendar</p>
          <Calendar
            mode='single'
            disabled={{ before: new Date() }}
            showOutsideDays={false}
            numberOfMonths={12}
            pagedNavigation
            selected={date}
            onSelect={setDate}
            className='rounded-md w-full overflow-y-scroll no-scrollbar'
          />
        </Modal>
      )}

      {isServiceOpen && (
        <Modal isOpen={isServiceOpen} onClose={handleServiceModal}>
          <p className='mb-4 font-bold self-start'>Pick a service!</p>
          <div className='flex flex-wrap space-x-3 items-center'>
            {categories.map((category) => (
              <button
                onClick={() => {
                  setService(category);
                }}
                className={cn(
                  'px-4 py-1 my-1.5 rounded-2xl border border-black',
                  service === category &&
                    'disabled bg-black text-white cursor-default'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </Modal>
      )}
      <p className='my-1 self-start sm:self-center text-xs text-black font-semibold'>
        {`We found ${clientData.length} clients who specialize in ${service}!`}
      </p>
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
