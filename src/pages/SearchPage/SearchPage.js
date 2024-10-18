import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Dot } from 'lucide-react';
import useDataStore from 'src/stores/useDataStore';
import useSearchStore from 'src/stores/useSearchStore';
import { ClientCardSkeleton } from 'src/components/ClientCardSkeleton';
import ClientCard from 'src/components/ClientCard/ClientCard';
import PageLoader from 'src/components/PageLoader';

const imagesHair = [
  '/static/hair-1.jpeg',
  '/static/hair-2.jpeg',
  '/static/hair-3.jpeg',
  '/static/hair-4.jpeg',
  '/static/hair-5.jpeg',
];

const SearchPage = () => {
  // Router
  const navigate = useNavigate();
  const handleSearchClick = () => {
    navigate('/search/search-page');
  };

  // Zustand
  const dataStore = useDataStore((state) => state.data);
  const isDataLoadingStore = useDataStore((state) => state.isLoading);
  const getDataStore = useDataStore((state) => state.getData);
  const getTrendingDataStore = useDataStore((state) => state.getTrendingData);
  const getClosestDataStore = useDataStore((state) => state.getClosestData);

  //
  const city = useSearchStore((state) => state.city);
  const province = useSearchStore((state) => state.province);
  const service = useSearchStore((state) => state.service);
  const filter = useSearchStore((state) => state.filter);
  const lat = useSearchStore((state) => state.lat);
  const long = useSearchStore((state) => state.long);
  const limit = useSearchStore((state) => state.limit);
  const page = useSearchStore((state) => state.page);
  const searchKeyword = useSearchStore((state) => state.searchKeyword);
  const setSearchKeyword = useSearchStore((state) => state.setSearchKeyword);

  // Function that renders card component for information from dataStore
  const renderAetheticianCards = () => {
    const limit = 10;
    let page = 1;
    if (isDataLoadingStore === true) {
      const skeletons = Array.from({ length: limit }, () => (
        <ClientCardSkeleton />
      ));
      return skeletons;
    } else {
      const cards = dataStore.map((aethetician) => {
        return (
          <ClientCard
            aestheticianId={aethetician._id}
            images={imagesHair}
            profilePicture={aethetician.profile_picture}
            firstName={aethetician.first_name}
            lastName={aethetician.last_name}
            userStory={aethetician.user_story}
            services={aethetician.services}
            location={aethetician.address}
            city={aethetician.city}
            province={aethetician.province}
            postalCode={aethetician.postal_code}
            rating={aethetician.rating}
            latitude={aethetician.latitude}
            longitude={aethetician.longitude}
            distance={aethetician.distance}
            photos={aethetician.photos}
          />
        );
      });
      return cards;
    }
  };

  const handleServiceCategoryClick = (e) => {
    const newService = e.target.getAttribute('data-name');
    console.log('newService: ', newService);
    // set the params first
    setSearchKeyword(newService);
    getDataStore(lat, long, city, province, newService, limit, page);
  };

  // render blocks
  // This function will be in the SearchBlock Carousel component
  // takes in an array of strings, strings are the titles of each block
  const topics = ['Trending, Nearby, Nails, Botox, Lashes, Hair'];

  // if (isDataLoadingStore === true)
  //   return <PageLoader className='z-50 absolute inset-x-0' />;

  return (
    <div className='flex flex-col my-4 mb-20 mx-4 text-neutral-600 font-nunito'>
      <h3 className='text-3xl text-black font-bold my-6'>Aetheticians</h3>
      <div className='flex flex-col space-y-3 mb-6'>
        <p className='text-xl font-bold'>What are you looking for?</p>

        <button
          onClick={handleSearchClick}
          className='sticky top-5 z-40 py-2 px-4 flex items-center space-x-3 text-left text-base border border-neutral-400 rounded-xl shadow-md'
        >
          <Search size='20' />
          {/* Pull the values from the useSearchStore to generate text here */}
          {!city || !province || !service ? (
            <p>Personalize Your Search!</p>
          ) : (
            <div className='flex items-center'>
              <p>
                {city}, {province}
              </p>
              <Dot size='22' />
              <p>{service}</p>
              {filter && (
                <>
                  <Dot size='22' />
                  <p>{filter}</p>
                </>
              )}
            </div>
          )}
        </button>
      </div>
      <div
        className='flex flex-col 
      space-y-6 '
      >
        {/* {isDataLoadingStore && (
          <PageLoader className='z-50 absolute inset-x-0' />
        )} */}
        {dataStore.length === 0 && isDataLoadingStore === false ? (
          <>
            <div id='search-row' className='flex space-x-6 h-40'>
              <div
                name='Trending'
                onClick={() => {
                  setSearchKeyword('Trending');
                  getTrendingDataStore(lat, long, city, province, limit, page);
                }}
                data-type='filter'
                className='w-4/12 bg-gray-200 p-4  rounded-lg shadow-md'
              >
                <p className='font-bold text-black'>Trending</p>
              </div>
              <div
                name='Nearby'
                onClick={() => {
                  setSearchKeyword('Nearby');
                  getClosestDataStore(lat, long, city, province, limit, page);
                }}
                data-type='filter'
                className='grow flex bg-gray-200 p-4 rounded-lg shadow-md'
              >
                <p className='font-bold text-black '>Nearby</p>
              </div>
            </div>
            <div id='search-row' className='flex space-x-6 h-40 '>
              <div
                data-name='Nails'
                onClick={handleServiceCategoryClick}
                data-type='service'
                className='grow bg-gray-200 rounded-lg shadow-md p-4'
              >
                <p className='font-bold text-black'>Nails</p>
              </div>
              <div
                data-name='Lashes'
                onClick={handleServiceCategoryClick}
                data-type='service'
                className='w-4/12 p-4 bg-gray-200 rounded-lg shadow-md'
              >
                <p className='font-bold text-black '>Lashes</p>
              </div>
            </div>
            <div id='search-row' className='flex space-x-6 h-40 '>
              <div
                data-name='Hair'
                onClick={handleServiceCategoryClick}
                data-type='service'
                className='w-4/12 p-4 bg-gray-200 rounded-lg shadow-md'
              >
                <p className='font-bold text-black'>Hair</p>
              </div>
              <div
                data-name='Botox'
                onClick={handleServiceCategoryClick}
                data-type='service'
                className='grow p-4 bg-gray-200 rounded-lg shadow-md'
              >
                <p className='font-bold text-black mt-auto'>Botox</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='space-y-1'>
              <h3 className='text-2xl text-black font-bold tracking-wide'>
                {searchKeyword}
              </h3>
              <p className='text-base'>Find your search results below!</p>
            </div>
            {renderAetheticianCards()}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
