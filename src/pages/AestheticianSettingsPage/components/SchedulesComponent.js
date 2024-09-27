import React, { useState, useEffect, useCallback } from 'react';
import useSchedulesStore from 'src/stores/useSchedulesStore';
import schedulesConstant from 'src/constants/days';
import days from 'src/constants/days';
import PulseLoader from 'src/components/PulseLoader';
import { cn } from 'src/lib/utils';

const SchedulesComponent = ({ userId }) => {
  // store
  const schedulesStore = useSchedulesStore((state) => state.schedules);
  const schedulesStoreLoading = useSchedulesStore((state) => state.isLoading);
  const postSchedulesStore = useSchedulesStore((state) => state.postSchedules);

  // local
  const [schedules, setSchedules] = useState([]);
  const [schedulesOpen, setSchedulesOpen] = useState(false);
  const [schedulesErrorOpen, setSchedulesErrorOpen] = useState(false);

  const renderSchedules = useCallback(() => {
    const schedulesDayArray = schedulesStore?.map(
      (schedulesObj) => schedulesObj.day
    );
    setSchedules(schedulesDayArray);
  }, [schedulesStore]);

  useEffect(() => {
    if (schedulesStore !== null) {
      renderSchedules();
    }
  }, [schedulesStore, renderSchedules]);

  //   Methods
  const toggleSchedulesOpen = () => {
    if (schedulesErrorOpen === true) {
      setSchedulesErrorOpen(false);
    }
    setSchedulesOpen(!schedulesOpen);
  };

  const cancelSchedules = () => {
    renderSchedules();
    toggleSchedulesOpen();
  };

  const handleSchedulesClick = (e) => {
    const included = schedules.includes(e.target.value);
    const value = e.target.value;

    // If services state does not include, add
    if (included === false) {
      setSchedules((prevState) => {
        return [value, ...prevState];
      });
      // If services state includes, remove
    } else {
      setSchedules((prevState) => {
        const updatedArray = prevState.filter((day) => day !== value);
        return updatedArray;
      });
    }
  };

  const submitSchedules = async () => {
    await postSchedulesStore(userId, schedules);

    toggleSchedulesOpen();
  };

  return (
    <div className='flex flex-col border-b py-4'>
      <div className='flex justify-between'>
        <p className='text-black '>Availability</p>
        <button className='underline' onClick={cancelSchedules}>
          {schedulesOpen ? 'Cancel' : 'Edit'}
        </button>
      </div>
      {schedulesOpen ? (
        <div className='flex flex-col'>
          <p className='mb-3'>
            Click a day to select or deselect it. Selected days are highlighted,
            making it easy to manage your offerings.
          </p>
          <div className='flex flex-wrap items-start'>
            {schedulesConstant.map((day) => (
              <button
                value={day}
                className={cn(
                  'py-2 px-4 mx-1 my-1 border rounded-full font-semibold shadow-md ',
                  schedules.includes(day)
                    ? 'bg-black text-white'
                    : 'bg-white text-black'
                )}
                onClick={handleSchedulesClick}
              >
                {day}
              </button>
            ))}
          </div>

          <button
            className='mt-8 mr-auto text-center w-16 h-8 border rounded-md bg-black text-white font-semibold'
            onClick={submitSchedules}
          >
            {schedulesOpen && schedulesStoreLoading ? <PulseLoader /> : 'Save'}
          </button>
        </div>
      ) : (
        <p>
          {schedules
            .sort((a, b) => days.indexOf(a) - days.indexOf(b))
            .join(', ')}
        </p>
      )}
    </div>
  );
};

export default SchedulesComponent;
