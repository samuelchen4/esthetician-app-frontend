import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Loader from 'src/components/Loader';
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
    location: addressStore,
    city,
    province,
    role,
  } = user || {};
  const userLoading = useUserStore((state) => state.isLoading);
  const patchNamesServer = useUserStore((state) => state.patchUserName);

  const resetNames = () => {
    setFirstName(firstNameStore);
    setLastName(lastNameStore);
  };

  const toggleNameOpen = () => {
    if (nameOpen === true) {
      resetNames();
    }
    if (nameErrorOpen === true) {
      setNameErrorOpen(false);
    }
    setNameOpen(!nameOpen);
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
    setEmailOpen(!emailOpen);
  };

  const togglePhoneOpen = () => {
    setPhoneOpen(!phoneOpen);
  };

  const toggleAddressOpen = () => {
    setAddressOpen(!addressOpen);
  };
  //  local state
  const [nameOpen, setNameOpen] = useState(false);
  const [nameErrorOpen, setNameErrorOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState('');

  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phone, setPhone] = useState('');

  const [addressOpen, setAddressOpen] = useState(false);
  const [address, setAddress] = useState('');
  //   populate local state
  useEffect(() => {
    if (firstNameStore) setFirstName(firstNameStore);
    if (lastNameStore) setLastName(lastNameStore);
    if (emailStore) setEmail(emailStore);
    if (addressStore) setAddress(addressStore);
  }, [firstNameStore, lastNameStore, emailStore, addressStore]);

  return (
    <div className='h-full py-2 mx-4 flex flex-col text-neutral-600 text-sm'>
      {/* {userLoading && <Loader />} */}
      <ChevronLeft
        size='22'
        className='text-black mt-3 mb-10'
        onClick={() => navigate(-1)}
      />
      <h2 className='text-black font-semibold text-lg mb-5'>Personal Info</h2>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Name</p>
          <button className='underline' onClick={toggleNameOpen}>
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
              className='mt-8 mr-auto py-1 px-2 border rounded-md bg-black text-white font-semibold'
              onClick={submitName}
            >
              Save
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
          <button className='underline' onClick={toggleEmailOpen}>
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
            <button
              className='mt-8 mr-auto py-1 px-2 border rounded-md bg-black text-white font-semibold'
              onClick={toggleEmailOpen}
            >
              Save
            </button>
          </div>
        ) : (
          <p>{email}</p>
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Phone</p>
          <button className='underline' onClick={togglePhoneOpen}>
            {phoneOpen ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {phoneOpen ? (
          <div className='flex flex-col'>
            <div className='flex flex-col space-y-1 mt-2'>
              {/* <label htmlFor='phone'>Phone</label> */}
              <input
                id='phone'
                type='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Example: 4031234567'
                className='border rounded-lg py-2 px-3'
              />
            </div>
            <button
              className='mt-8 mr-auto py-1 px-2 border rounded-md bg-black text-white font-semibold'
              onClick={togglePhoneOpen}
            >
              Save
            </button>
          </div>
        ) : (
          <p>{phone || 'Not provided'}</p>
        )}
      </div>
      <div className='flex flex-col border-b py-4'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold'>Address</p>
          <button className='underline' onClick={toggleAddressOpen}>
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='phone'>City</label>
              <input
                id='address'
                type='text'
                value={address}
                placeholder='Example: Calgary'
                onChange={(e) => setAddress(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>
            <div className='flex flex-col space-y-1 mt-2'>
              <label htmlFor='phone'>Province</label>
              <input
                id='address'
                type='text'
                value={address}
                placeholder='Example: Alberta'
                onChange={(e) => setAddress(e.target.value)}
                className='border rounded-lg py-2 px-3'
              />
            </div>

            <button
              className='mt-8 mr-auto py-1 px-2 border rounded-md bg-black text-white font-semibold'
              onClick={toggleAddressOpen}
            >
              Save
            </button>
          </div>
        ) : (
          <p>{address || 'Not provided'}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoPage;
