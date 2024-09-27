import React, { useState, useEffect } from 'react';
import useUserStore from 'src/stores/useUserStore';
import PulseLoader from 'src/components/PulseLoader';

const NameComponent = ({ _id, firstNameStore, lastNameStore, userLoading }) => {
  // store
  const patchNamesServer = useUserStore((state) => state.patchUserName);

  // local
  const [nameOpen, setNameOpen] = useState(false);
  const [nameErrorOpen, setNameErrorOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // initialize local state
  useEffect(() => {
    if (firstNameStore) setFirstName(firstNameStore);
    if (lastNameStore) setLastName(lastNameStore);
  }, [firstNameStore, lastNameStore]);

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
  return (
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
  );
};

export default NameComponent;
