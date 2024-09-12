import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import PulseLoader from 'src/components/PulseLoader';
import useUserStore from 'src/stores/useUserStore';

const PersonalInfoPage = () => {
  // React Router
  const navigate = useNavigate();

  // Zustand
  const user = useUserStore((state) => state.user);
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
  const patchNamesServer = useUserStore((state) => state.patchUserName);
  const patchEmailServer = useUserStore((state) => state.patchEmail);
  const patchPhoneServer = useUserStore((state) => state.patchPhone);
  const patchAddressServer = useUserStore((state) => state.patchAddress);

  const toggleNameOpen = () => {
    if (nameErrorOpen === true) {
      setNameErrorOpen(false);
    }
    setNameOpen(!nameOpen);
  };

  const cancelName = () => {
    // Reset name state
    setFirstName(firstNameStore);
    setLastName(lastNameStore);

    toggleNameOpen();
  };

  const submitName = async () => {
    // Check is names are valid
    const regex = /^[A-Za-z/s-]+$/;
    if (regex.test(firstName) && regex.test(lastName)) {
      // make api call for users
      await patchNamesServer(_id, firstName, lastName);
      toggleNameOpen();
    } else {
      // toggle error message state
      setNameErrorOpen(true);
    }
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
  const [nameOpen, setNameOpen] = useState(false);
  const [nameErrorOpen, setNameErrorOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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
  //   populate local state
  useEffect(() => {
    if (firstNameStore) setFirstName(firstNameStore);
    if (lastNameStore) setLastName(lastNameStore);
    if (emailStore) setEmail(emailStore);
    if (addressStore) setAddress(addressStore);
    if (postalCodeStore) setPostalCode(postalCodeStore);
    if (cityStore) setCity(cityStore);
    if (provinceStore) setProvince(provinceStore);
  }, [
    firstNameStore,
    lastNameStore,
    emailStore,
    addressStore,
    postalCodeStore,
    cityStore,
    provinceStore,
  ]);

  return (
    <div className='py-2 mx-4 flex flex-col text-neutral-600 text-sm'>
      <ChevronLeft
        size='22'
        className='text-black mt-3 mb-10'
        onClick={() => navigate(-1)}
      />
      <h2 className='text-black font-semibold text-lg mb-5'>Personal Info</h2>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Name</p>
          <button className='underline' onClick={cancelName}>
            {nameOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {nameOpen ? (
          <div className='flex flex-col'>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='firstName'>First Name</label>
              <input
                id='firstName'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                id='lastName'
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            {nameErrorOpen && (
              <p className='mt-2 text-xs text-red-500 italic'>
                Names can only contain letters!
              </p>
            )}
            <button
              className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
              onClick={submitName}
            >
              {nameOpen && userLoading ? <PulseLoader /> : 'Save'}
            </button>
          </div>
        ) : (
          <p>
            {firstName} {lastName}
          </p>
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Email</p>
          <button className='underline' onClick={cancelEmail}>
            {emailOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {emailOpen ? (
          <div className='flex flex-col'>
            <div className='flex flex-col space-y-1 mt-2'>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
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
          <p>{email}</p>
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Phone</p>
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
          <p>{phone || 'Not provided'}</p>
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Address</p>
          <button className='underline' onClick={cancelAddress}>
            {addressOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {addressOpen ? (
          <div className='flex flex-col'>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='phone'>Address</label>
              <input
                id='address'
                type='text'
                placeholder='Example: 1234 Sandstone Road NW'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='phone'>Postal code</label>
              <input
                id='address'
                type='text'
                placeholder='Example: T3K 2X1'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='phone'>City</label>
              <input
                id='address'
                type='text'
                value={city}
                placeholder='Example: Calgary'
                onChange={(e) => setCity(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='province'>Province</label>
              <input
                id='province'
                type='text'
                value={province}
                placeholder='Example: AB'
                onChange={(e) => setProvince(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            {addressErrorOpen && (
              <p className='mt-2 text-xs text-red-500 italic'>
                Invalid Address, Postal Code, City, or Province
              </p>
            )}

            <button
              className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
              onClick={submitAddress}
            >
              {addressOpen && userLoading ? <PulseLoader /> : 'Save'}
            </button>
          </div>
        ) : (
          <p>
            {address || 'Not provided'}
            {/* {address ? ', ' + address : ''}
            {postalCode ? ', ' + postalCode : ''}
            {city ? ', ' + city : ''}
            {province ? ', ' + province : ''} */}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoPage;
