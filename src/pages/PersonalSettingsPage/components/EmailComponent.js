import React, { useState, useEffect } from 'react';
import useUserStore from 'src/stores/useUserStore';
import PulseLoader from 'src/components/PulseLoader';

const EmailComponent = ({ _id, emailStore, userLoading }) => {
  // store
  const patchEmailServer = useUserStore((state) => state.patchEmail);

  // local
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailErrorOpen, setEmailErrorOpen] = useState(false);
  const [email, setEmail] = useState('');

  // initialize local state
  useEffect(() => {
    if (emailStore) setEmail(emailStore);
  }, [emailStore]);

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

  return (
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
  );
};

export default EmailComponent;
