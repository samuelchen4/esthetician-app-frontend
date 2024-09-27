import React, { useState, useEffect } from 'react';
import useUserStore from 'src/stores/useUserStore';
import PulseLoader from 'src/components/PulseLoader';

const PhoneComponent = ({ _id, phoneStore, userLoading }) => {
  // store
  const patchPhoneServer = useUserStore((state) => state.patchPhone);

  // local
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [phoneErrorOpen, setPhoneErrorOpen] = useState(false);
  const [phone, setPhone] = useState('');

  // initialize local state
  useEffect(() => {
    if (phoneStore) setPhone(phoneStore);
  }, [phoneStore]);

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

  return (
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
  );
};

export default PhoneComponent;
