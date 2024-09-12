import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera } from 'lucide-react';
import PulseLoader from 'src/components/PulseLoader';
import useUserStore from 'src/stores/useUserStore';
import useServicesStore from 'src/stores/useServicesStore';
import useSchedulesStore from 'src/stores/useSchedulesStore';
import usePhotosStore from 'src/stores/usePhotosStore';
import servicesConstant from 'src/constants/categories';
import Carousel from 'src/components/Carousel';
import { cn } from 'src/lib/utils';

const PersonalProviderInfoPage = () => {
  // React Router
  const navigate = useNavigate();

  // Zustand
  const user = useUserStore((state) => state.user);
  const servicesStore = useServicesStore((state) => state.services);
  const servicesStoreLoading = useServicesStore((state) => state.isLoading);
  const photosStore = usePhotosStore((state) => state.photos);
  const schedulesStore = useSchedulesStore((state) => state.schedules);

  const {
    _id,
    first_name: firstNameStore,
    last_name: lastNameStore = 'Last',
    email: emailStore,
    phone_number: phoneStore,
    address: addressStore,
    postal_code: postalCodeStore,
    city: cityStore,
    province: provinceStore,
    // role:roleStore,
  } = user || {};
  const userLoading = useUserStore((state) => state.isLoading);
  const patchEmailServer = useUserStore((state) => state.patchEmail);
  const patchPhoneServer = useUserStore((state) => state.patchPhone);
  const patchAddressServer = useUserStore((state) => state.patchAddress);

  const renderServices = useCallback(() => {
    const serviceNamesArray = servicesStore.map(
      (servicesObj) => servicesObj.service_name
    );
    console.log('serviceNamesArray: ', serviceNamesArray);
    setServices(serviceNamesArray);
  }, [servicesStore]);

  const renderPhotos = useCallback(() => {
    const photosUrlArray = photosStore.map((photosObj) => {
      return photosObj.image_url;
    });
    setPhotos(photosUrlArray);
  }, [photosStore]);

  const renderSchedules = useCallback(() => {
    const schedulesDayArray = schedulesStore.map(
      (schedulesObj) => schedulesObj.day
    );
    setSchedules(schedulesDayArray);
  }, [schedulesStore]);

  //   Run this everytime servicesStore changes
  useEffect(() => {
    if (servicesStore !== null) {
      renderServices();
    }

    if (photosStore !== null) {
      renderPhotos();
    }

    if (schedulesStore !== null) {
      renderSchedules();
    }
  }, [
    servicesStore,
    photosStore,
    schedulesStore,
    renderServices,
    renderPhotos,
    renderSchedules,
  ]);

  const toggleServicesOpen = () => {
    if (servicesErrorOpen === true) {
      setServicesErrorOpen(false);
    }
    setServicesOpen(!servicesOpen);
  };

  const cancelServices = () => {
    // Reset name state
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
    // Check is names are valid
  };

  const toggleEmailOpen = () => {
    if (emailErrorOpen === true) {
      setEmailErrorOpen(false);
    }
    setEmailOpen(!emailOpen);
  };

  const cancelEmail = () => {
    setEmail(emailStore);
    toggleEmailOpen();
  };

  const submitEmail = async () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email)) {
      // Submit email to db
      await patchEmailServer(_id, email);

      // Close email modal
      toggleEmailOpen();
    } else {
      setEmailErrorOpen(true);
    }
  };

  const togglePhoneOpen = () => {
    if (phoneOpen === true) {
      setPhoneErrorOpen(false);
    }
    setPhoneOpen(!phoneOpen);
  };

  const cancelPhone = () => {
    // Reset phone state
    setPhone(phoneStore);
    togglePhoneOpen();
  };

  const submitPhone = async () => {
    const regex = /^[0-9]+$/;
    if (regex.test(phone)) {
      // submit phone
      await patchPhoneServer(_id, phone);
      togglePhoneOpen();
    } else {
      setPhoneErrorOpen(true);
    }
  };

  const toggleAddressOpen = () => {
    if (addressErrorOpen === true) {
      setAddressErrorOpen(false);
    }
    setAddressOpen(!addressOpen);
  };

  const cancelAddress = () => {
    setAddress(addressStore);
    setPostalCode(postalCodeStore);
    setCity(cityStore);
    setProvince(provinceStore);

    toggleAddressOpen();
  };

  const submitAddress = async () => {
    const addressRegex = /^[a-zA-Z0-9\s,'-]*$/;
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const cityRegex = /^[a-zA-Z\s'-]{2,}$/;
    const provinceRegex = /^(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT)$/;

    if (
      addressRegex.test(address) &&
      postalCodeRegex.test(postalCode) &&
      cityRegex.test(city) &&
      provinceRegex.test(province)
    ) {
      await patchAddressServer(_id, address, postalCode, city, province);
      toggleAddressOpen();
    } else {
      setAddressErrorOpen(true);
    }
  };

  //  local state
  const [services, setServices] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesErrorOpen, setServicesErrorOpen] = useState(false);

  const [photos, setPhotos] = useState([]);

  const [schedules, setSchedules] = useState([]);

  const [emailOpen, setEmailOpen] = useState(false);
  const [emailErrorOpen, setEmailErrorOpen] = useState(false);
  const [email, setEmail] = useState('');

  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phoneErrorOpen, setPhoneErrorOpen] = useState(false);
  const [phone, setPhone] = useState('');

  const [addressOpen, setAddressOpen] = useState(false);
  const [addressErrorOpen, setAddressErrorOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');

  useEffect(() => {
    console.log(services);
  }, [services]);

  return (
    <div className='py-2 mx-4 flex flex-col text-neutral-600 text-sm overflow-y-auto'>
      <ChevronLeft
        size='22'
        className='text-black mt-3 mb-10'
        onClick={() => navigate(-1)}
      />
      <h2 className='text-black font-semibold text-lg mb-5'>Provider Info</h2>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between mb-2'>
          <p className='text-black font-semibold'>Services</p>
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
                    services.includes(service)
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  )}
                  onClick={handleServicesClick}
                >
                  {service}
                </button>
              ))}
            </div>
            {servicesErrorOpen && (
              <p className='mt-2 text-xs text-red-500 italic'>
                Names can only contain letters!
              </p>
            )}
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
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Pictures</p>
          <button className='underline' onClick={cancelEmail}>
            {emailOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {emailOpen ? (
          <div className='flex flex-col'>
            <div className='flex flex-col space-y-2 mt-2'>
              <p>
                Click the button below to showoff pictures of your work from
                your camera roll!
              </p>
              <label
                htmlFor='fileInput'
                className='w-full h-40 flex flex-col items-center justify-center cursor-pointer bg-neutral-100 text-black border rounded-lg font-semibold'
              >
                <Camera size='40' />
                <p>Select Photos!</p>
              </label>
              <input
                id='fileInput'
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
              />
              <Carousel images={photos} width='100' />
            </div>
            {emailErrorOpen && (
              <p className='mt-2 text-xs text-red-500 italic'>
                Invalid email address. Please enter a valid email.
              </p>
            )}
            <button
              className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
              onClick={submitEmail}
            >
              {emailOpen && userLoading ? <PulseLoader /> : 'Save'}
            </button>
          </div>
        ) : (
          <Carousel images={photos} width='100' />
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Availability</p>
          <button className='underline' onClick={cancelPhone}>
            {phoneOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {phoneOpen ? (
          <div className='flex flex-col'>
            <div className='flex flex-col space-y-1 mt-2'>
              <input
                id='phone'
                type='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Example: 4031234567'
                className='border rounded-lg py-2 px-3'
              />
            </div>
            {phoneErrorOpen && (
              <p className='mt-2 text-xs text-red-500 italic'>
                Invalid phone number. Can only contain 0-9!
              </p>
            )}

            <button
              className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
              onClick={submitPhone}
            >
              {phoneOpen && userLoading ? <PulseLoader /> : 'Save'}
            </button>
          </div>
        ) : (
          <p>{schedules.join(', ')}</p>
        )}
      </div>
      <div className='mt-20 flex flex-col items-center space-y-3'>
        <p>Click this button to see what your profile looks like!</p>
        <button className='px-4 py-2 border border-gray-500 bg-black text-white font-semibold rounded-full'>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default PersonalProviderInfoPage;
