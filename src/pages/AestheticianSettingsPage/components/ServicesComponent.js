import React, { useState, useEffect, useCallback } from 'react';
import useServicesStore from 'src/stores/useServicesStore';
import PulseLoader from 'src/components/PulseLoader';
import { cn } from 'src/lib/utils';
import servicesConstant from 'src/constants/categories';

const ServicesComponent = ({ userId }) => {
  // Store
  const servicesStore = useServicesStore((state) => state.services);
  const servicesStoreLoading = useServicesStore((state) => state.isLoading);
  const postServicesStore = useServicesStore((state) => state.postServices);

  // local
  const [services, setServices] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesErrorOpen, setServicesErrorOpen] = useState(false);

  const renderServices = useCallback(() => {
    const serviceNamesArray = servicesStore?.map(
      (servicesObj) => servicesObj.service_name
    );
    console.log('serviceNamesArray: ', serviceNamesArray);
    setServices(serviceNamesArray);
  }, [servicesStore]);

  useEffect(() => {
    if (servicesStore !== null) {
      renderServices();
    }
  }, [servicesStore, renderServices]);

  const toggleServicesOpen = () => {
    if (servicesErrorOpen === true) {
      setServicesErrorOpen(false);
    }
    setServicesOpen(!servicesOpen);
  };

  const cancelServices = () => {
    renderServices();
    toggleServicesOpen();
  };

  const handleServicesClick = (e) => {
    const included = services.includes(e.target.value);
    const value = e.target.value;

    // If services state does not include, add
    if (included === false) {
      setServices((prevState) => {
        return [value, ...prevState];
      });
      // If services state includes, remove
    } else {
      setServices((prevState) => {
        const updatedArray = prevState.filter((service) => service !== value);
        return updatedArray;
      });
    }
  };

  const submitServices = async () => {
    // Post the new services into DB
    console.log('starting submit');
    await postServicesStore(userId, services);
    console.log('ending submit');

    toggleServicesOpen();
  };

  return (
    <div className='flex flex-col border-b py-4'>
      <div className='flex justify-between mb-2'>
        <p className='text-black'>Services</p>
        <button className='underline' onClick={cancelServices}>
          {servicesOpen ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {servicesOpen ? (
        <div className='flex flex-col'>
          <p className='mb-3'>
            Click a service to select or deselect it. Selected services are
            highlighted, making it easy to manage your offerings.
          </p>
          <div className='flex flex-wrap items-start'>
            {servicesConstant.map((service) => (
              <button
                value={service}
                className={cn(
                  'py-2 px-4 mx-1 my-1 border rounded-full font-semibold shadow-md ',
                  services?.includes(service)
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                )}
                onClick={handleServicesClick}
              >
                {service}
              </button>
            ))}
          </div>
          <button
            className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
            onClick={submitServices}
          >
            {servicesOpen && servicesStoreLoading ? <PulseLoader /> : 'Save'}
          </button>
        </div>
      ) : (
        <p>{services.join(', ')}</p>
      )}
    </div>
  );
};

export default ServicesComponent;
