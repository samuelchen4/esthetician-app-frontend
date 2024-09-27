import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import useUserStore from 'src/stores/useUserStore';
import NameComponent from 'src/pages/PersonalSettingsPage/components/NameComponent';
import EmailComponent from 'src/pages/PersonalSettingsPage/components/EmailComponent';
import PhoneComponent from 'src/pages/PersonalSettingsPage/components/PhoneComponent';
import AddressComponent from 'src/pages/PersonalSettingsPage/components/AddressComponent';

const PersonalSettingsPages = () => {
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
  } = user || {};
  const userLoading = useUserStore((state) => state.isLoading);

  return (
    <div className='py-2 mx-4 flex flex-col text-neutral-600 text-sm'>
      <ChevronLeft
        size='22'
        className='text-black mt-3 mb-10'
        onClick={() => navigate(-1)}
      />
      <h2 className='text-black font-semibold text-lg mb-5'>Personal Info</h2>

      <NameComponent
        _id={_id}
        firstNameStore={firstNameStore}
        lastNameStore={lastNameStore}
        userLoading={userLoading}
      />
      <EmailComponent
        _id={_id}
        emailStore={emailStore}
        userLoading={userLoading}
      />
      <PhoneComponent
        _id={_id}
        phoneStore={phoneStore}
        userLoading={userLoading}
      />
      <AddressComponent
        _id={_id}
        addressStore={addressStore}
        postalCodeStore={postalCodeStore}
        cityStore={cityStore}
        provinceStore={provinceStore}
        userLoading={userLoading}
      />
    </div>
  );
};

export default PersonalSettingsPages;
