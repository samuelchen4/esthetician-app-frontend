import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchPage = () => {
  // router
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search/search-page');
  };

  return (
    <div className='flex flex-col my-4 mb-20 mx-6 text-neutral-600 font-nunito border'>
      <h3 className='text-3xl text-black font-bold my-6'>Aetheticians</h3>
      <div className='flex flex-col space-y-3 mb-10'>
        <p className='text-xl font-bold'>What are you looking for?</p>

        <button
          onClick={handleSearchClick}
          className='sticky top-5 z-40 py-2.5 px-4 flex items-center space-x-2 text-left overflow-x-hidden border border-neutral-400 rounded-xl shadow-md'
        >
          <Search size='20' />
          {/* Pull the values from the useSearchStore to generate text here */}
          <p>Calgary, Alberta</p>
        </button>
      </div>
      <div></div>
      {true && (
        <p className='text-base'>
          There are x Aestiticians in y that specialize in z
        </p>
      )}
      <div className=' mb-[3000px]'>{/* render cards */}</div>
    </div>
  );
};

export default SearchPage;
