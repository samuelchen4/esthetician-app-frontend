import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useMobileNavStore from 'src/stores/useMobileNavStore';
import useSearchStore from 'src/stores/useSearchStore';
import { cn } from 'src/lib/utils';
import { MoveLeft } from 'lucide-react';
import serviceConstants from 'src/constants/categories';
import filterConstants from 'src/constants/filters';
import PulseLoader from 'src/components/PulseLoader';

const SearchModalPage = ({ className }) => {
  //   dom router
  const navigate = useNavigate();

  // MobileNavStore
  const setIsOpenMobileStore = useMobileNavStore((state) => state.setIsOpen);

  //   SearchStore
  const service = useSearchStore((state) => state.service);
  const setService = useSearchStore((state) => state.setService);

  const filter = useSearchStore((state) => state.filter);
  const setFilter = useSearchStore((state) => state.setFilter);

  //   Set the mobile nav component to close when this component is open
  useEffect(() => {
    setIsOpenMobileStore(false);

    return () => {
      // open mobile store on unmount
      setIsOpenMobileStore(true);
    };
  }, []);

  const clickBackButton = () => {
    navigate(-1);
  };

  //   Render service buttons
  const renderServiceButtons = () => {
    //   onClick for buttons
    const handleServiceButtonClick = (e) => {
      console.log('service clicked: ', e.target.name);
      const newService = e.target.name;

      if (service === newService) {
        setService('');
      } else {
        setService(newService);
      }
    };

    const buttons = serviceConstants.map((serviceConstant) => {
      return (
        <button
          name={serviceConstant}
          key={serviceConstant}
          onClick={handleServiceButtonClick}
          className={cn(
            'py-2 px-4 border rounded-lg bg-white text-primary border-primary',
            service === serviceConstant && 'bg-primary text-white'
          )}
        >
          {serviceConstant}
        </button>
      );
    });
    return buttons;
  };

  //   Render service buttons
  const renderFilterButtons = () => {
    //   onClick for buttons
    const handleFilterButtonClick = (e) => {
      console.log('filter clicked: ', e.target.name);
      const newFilter = e.target.name;

      if (filter === newFilter) {
        setFilter('');
      } else {
        setFilter(newFilter);
      }
    };

    const buttons = filterConstants.map((filterConstant) => {
      return (
        <button
          name={filterConstant}
          key={filterConstant}
          onClick={handleFilterButtonClick}
          className={cn(
            'py-2 px-4 border rounded-lg bg-white text-primary border-primary',
            filter === filterConstant && 'bg-primary text-white'
          )}
        >
          {filterConstant}
        </button>
      );
    });
    return buttons;
  };

  return (
    <div
      className={cn(
        'z-50 flex flex-col p-6 text-neutral-600 font-nunito bg-white text-base',
        className
      )}
    >
      <MoveLeft size='24' className='stroke-black' onClick={clickBackButton} />
      <h3 className='text-3xl text-black font-bold my-10'>Find Your Style</h3>
      <div className='flex flex-col space-y-3 mb-10'>
        <p className='text-xl font-bold'>Where are you?</p>
        {/* Change this to dropdown with the cities calgary and alberta */}
        <input
          className='py-2.5 px-4 border border-neutral-400 rounded-xl'
          placeholder='Calgary, Alberta'
        />
      </div>
      <div id='search-services' className='flex flex-col space-y-5 mb-10'>
        <p className='text-xl font-bold'>What services are you looking for?</p>
        <div className='flex flex-col space-y-4 w-2/5'>
          {renderServiceButtons()}
        </div>
      </div>
      <div id='search-filters' className='flex flex-col space-y-5 mb-10'>
        <p className='text-xl font-bold'>
          Pick your filters
          <span className='ml-2 text-xs'>(optional)</span>
        </p>
        <div className='flex flex-col space-y-4 w-2/5'>
          {renderFilterButtons()}
        </div>
      </div>
      <div
        id='search-buttons'
        className='fixed bottom-0 left-0 right-0 flex justify-end items-center px-6 pb-safe-bottom bg-white border-t border-gray-300'
      >
        {/* <p className=' underline underline-offset-2 text-sm'>Clear all</p> */}
        <Link to={'/search'}>
          <button className='my-3 w-20 h-10 bg-primary text-white rounded-lg'>
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchModalPage;
