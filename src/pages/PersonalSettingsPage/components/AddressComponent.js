import React, { useState, useEffect } from 'react';
import useUserStore from 'src/stores/useUserStore';
import PulseLoader from 'src/components/PulseLoader';

const AddressComponent = ({
  _id,
  addressStore,
  postalCodeStore,
  cityStore,
  provinceStore,
  userLoading,
}) => {
  // store
  const patchAddressServer = useUserStore((state) => state.patchAddress);

  // local
  const [addressOpen, setAddressOpen] = useState(false);
  const [addressErrorOpen, setAddressErrorOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');

  // initialize local state
  useEffect(() => {
    if (addressStore) setAddress(addressStore);
    if (postalCodeStore) setPostalCode(postalCodeStore);
    if (cityStore) setCity(cityStore);
    if (provinceStore) setProvince(provinceStore);
  }, [addressStore, postalCodeStore, cityStore, provinceStore]);

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

  return (
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
  );
};

export default AddressComponent;
