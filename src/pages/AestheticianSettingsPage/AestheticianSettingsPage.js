import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import useServicesStore from 'src/stores/useServicesStore';
import usePhotosStore from 'src/stores/usePhotosStore';
import useSchedulesStore from 'src/stores/useSchedulesStore';
import ServicesComponent from 'src/pages/AestheticianSettingsPage/components/ServicesComponent';
import PicturesComponent from 'src/pages/AestheticianSettingsPage/components/PicturesComponent';
import SchedulesComponent from 'src/pages/AestheticianSettingsPage/components/SchedulesComponent';
import PageLoader from 'src/components/PageLoader';

const AestheticianSettingsPage = () => {
  // React Router
  const navigate = useNavigate();
  const { userId: _id } = useParams();

  const services = useServicesStore((state) => state.services);
  const photos = usePhotosStore((state) => state.photos);
  const schedules = useSchedulesStore((state) => state.schedules);

  if (services === null || photos === null || schedules === null)
    return <PageLoader />;

  return (
    <div className='py-2 mx-4 flex flex-col text-neutral-600 overflow-y-auto animate-fadeIn'>
      <ChevronLeft
        size='22'
        className='text-black mt-3 mb-10'
        onClick={() => navigate(-1)}
      />
      <h2 className='text-black font-semibold text-2xl mb-5'>Provider Info</h2>
      <ServicesComponent userId={_id} />
      <PicturesComponent userId={_id} />
      <SchedulesComponent userId={_id} />
      <div className='mt-20 flex flex-col items-center space-y-3'>
        <p>Click this button to see what your profile looks like!</p>
        <button className='px-4 py-2 border border-gray-500 bg-black text-white font-semibold rounded-full'>
          View Profile
        </button>
      </div>
    </div>
  );
};

export default AestheticianSettingsPage;
