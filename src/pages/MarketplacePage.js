import React, { useState, useEffect } from 'react';
import api from '../api/api-config';
import { useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import ClientCard from '../components/ClientCard';
import Modal from '../components/Modal';
import { categories } from '../constants/categories';
import { cn } from 'src/lib/utils';
import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar';
import { ClientCardSkeleton } from 'src/components/ClientCardSkeleton';
import useUserStore from 'src/stores/useUserStore';

const MarketplacePage = () => {
  // useNavigate
  const navigate = useNavigate();
  // userStore
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    // if user is not null and doesnt have the role property
    if (user !== null && user?.role === null) {
      navigate('/sign-up/questionnaire');
    }
  }, [user]);

  const [clientData, setClientData] = useState([]);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [service, setService] = useState('Nails');
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  // header height store
  // const headerHeight = useHeaderStore((state) => state.headerHeight);
  const headerHeight = 50;
  // useEffect(() => {
  //   console.log(headerHeight);
  // }, [headerHeight]);

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

  // useEffect(() => {
  //   console.log(isServiceOpen);
  // }, [isServiceOpen]);

  // useEffect(() => {
  //   console.log(service);
  // }, [service]);

  useEffect(() => {
    const fetchClientCardData = async () => {
      const config = {
        params: { service },
      };

      try {
        const { data } = await api.get(
          '/api/marketplace/client-search',
          config
        );
        // console.log('api call completed!');
        // console.log(data.data);
        setClientData(data.data);
        // setClientData([data.data[0]]); // Testing to get one card
      } catch (error) {
        console.error('Error fetching client data', error);
      }
    };

    fetchClientCardData();
  }, [service]);

  // Renders the cards when the state changes
  // array of objects
  const renderCards = () => {
    // if loading, display skeleton
    if (clientData.length === 0) {
      return new Array(5).fill(null).map((item) => <ClientCardSkeleton />);
    }

    const clientCards = clientData.map((clientObj) => {
      const {
        _id: clientId,
        first_name,
        last_name,
        services,
        cost,
        avaliability = 'MWF',
        profile_picture,
        price_range: priceRange,
      } = clientObj;
      const name = `${first_name} ${last_name}`;
      return (
        <Link
          to={`/client-info/${clientId}`}
          state={{
            clientId,
            first_name,
            last_name,
            services,
            cost,
            avaliability,
            profile_picture,
          }}
        >
          <ClientCard
            name={name}
            services={services}
            location={'NW'}
            price={cost}
            avaliability={avaliability}
            picture={profile_picture}
            priceRange={priceRange}
          />
        </Link>
      );
    });
    return clientCards;
  };

  return (
    <div
      id='page-container'
      className='grow mx-4 flex flex-col text-neutral-600'
    >
      <h2 className='text-center my-5 font-bold text-5xl font-alexandria text-black'>
        Explore
        <span className='text-primary block md:inline-block md:ml-4'>
          Marketplace
        </span>
      </h2>
      <div
        id='search-container'
        className='text-sm flex mb-5 space-x-2 justify-center sticky z-90 py-2'
        style={{ top: headerHeight ? `${headerHeight}px` : 'auto' }}
      >
        <Button
          variant={'outline'}
          onClick={handleDatePickerModal}
          className={cn(
            'dark:none w-[225px] h-[40px] justify-start text-left font-normal rounded-2xl border-gray-500',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
        <Button
          variant={'outline'}
          onClick={handleServiceModal}
          className='h-[40px] font-normal rounded-2xl border-gray-500'
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
        {`We found ${
          clientData.length
        } clients who specialize in ${service?.toLowerCase()} for ${format(
          date,
          'PPP'
        )}!`}
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
