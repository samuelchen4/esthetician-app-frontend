import React, { useEffect } from 'react';
import { MoveLeft, Share, Heart, Instagram, Facebook } from 'lucide-react';
import Carousel from 'src/components/Carousel';
import useMobileNavStore from 'src/stores/useMobileNavStore';
import { useRouter } from 'src/hooks/useRouter';
import { cn, renderStars } from 'src/lib/utils';
import { useAestheticiansDataFetch } from 'src/hooks/useAestheticiansDataFetch';
import PageLoader from 'src/components/PageLoader';
import Map from 'src/components/Map/Map';

const AestheticiansPage = ({}) => {
  // controls UI so leave in component
  useEffect(() => {
    setIsBottomNavOpen(false);

    return () => {
      setIsBottomNavOpen(true);
    };
  }, []);

  const setIsBottomNavOpen = useMobileNavStore((state) => state.setIsOpen);

  const { goPreviousPage, params } = useRouter();
  const { userInfo, products, reviews, photos, services, isLoading, error } =
    useAestheticiansDataFetch(params.userId);

  console.log(userInfo);

  // make calls to render products ui
  const renderProducts = () => {
    const productCards = products.map((product) => {
      const { id, name, price, description } = product;

      return (
        <div
          key={id}
          className='h-32 p-4 border border-neutral-400 rounded-lg shadow-sm flex flex-col space-y-3'
        >
          <div className='flex justify-between'>
            <h4>{name}</h4>
            <p>From ${price}</p>
          </div>
          <p className='text-neutral-500 text-sm'>{description}</p>
        </div>
      );
    });
    return productCards;
  };
  // make calls to render reviews ui
  const renderReviews = () => {
    const reviewCards = reviews.map((review) => {
      const {
        id,
        profile_picture,
        name,
        review: body,
        rating,
        created_at,
      } = review;
      return (
        <div
          key={id}
          id='review-card'
          className='py-4 px-2 flex flex-col space-y-4 border-t border-neutral-400'
        >
          <div className='flex items-center space-x-4'>
            <img src={profile_picture} className='h-14 w-14 rounded-full' />
            <div className='flex flex-col'>
              <h5 className='font-semibold'>{name}</h5>
              <p className='text-sm'>{new Date(created_at).toDateString()}</p>
            </div>
          </div>
          <div className='flex space-x-1'>{renderStars(rating)}</div>
          <p className='text-neutral-500'>{body}</p>
        </div>
      );
    });
    return reviewCards;
  };

  // handle if error
  if (error) {
    console.log('There is an error: ', error);
  }
  if (isLoading) return <PageLoader className='h-[100dvh]' />;

  return (
    <div className='flex flex-col text-black font-nunito'>
      <div id='cover-photo' className='relative'>
        <div
          id='cover-photo-screen'
          className='absolute inset-0 bg-gradient-to-b from-white/0 to-white/100'
        ></div>
        <div className='absolute inset-x-6 top-5 text-black flex justify-between'>
          <div
            className='p-2 bg-neutral-100 rounded-full border border-neutral-300'
            onClick={goPreviousPage}
          >
            <MoveLeft size='24' />
          </div>
          <div className='flex space-x-6'>
            <div className='p-2 bg-neutral-100 rounded-full border border-neutral-300'>
              <Share size='24' />
            </div>
            <div className='p-2 bg-neutral-100 rounded-full border border-neutral-300'>
              <Heart size='24' />
            </div>
          </div>
        </div>
        <img
          src={userInfo.cover_picture}
          alt='personal cover photo for aesthetician'
          className='h-72 w-full object-cover border-b border-b-white'
        />
      </div>
      <div
        id='aesthetician-card'
        className='relative -top-28 mx-6 flex flex-col'
      >
        <img
          src={userInfo.profile_picture}
          className='rounded-full w-24 h-24 object-cover border-2 border-black'
        />
        <div className='mt-4 space-y-2 text-base'>
          <h3 className='text-3xl font-bold tracking-wide'>
            {userInfo.first_name} {userInfo.last_name}
          </h3>
          {/* <p>
            {services.map((serviceObj) => serviceObj.service_name).join(', ')}
          </p> */}
          <div className='flex space-x-2 items-center'>
            <p className='font-semibold'>{userInfo.rating}</p>
            <div className='flex space-x-1'>{renderStars(userInfo.rating)}</div>
          </div>
          <p>
            {userInfo.city}, {userInfo.province} (4.2 km away)
          </p>
          <div id='aesthetician-social-links' className='flex space-x-2'>
            <Instagram size='24' />
          </div>
        </div>
      </div>
      <div id='aesthetician-body' className='mx-6 space-y-10 mb-20'>
        <div className='space-y-4'>
          <h3 className='text-2xl font-semibold'>My Portfolio</h3>
          <Carousel
            width='225'
            state={photos.map((photoObj) => photoObj.image_url_local)}
            className='px-0'
          />
        </div>
        <div className='space-y-4'>
          <h3 className='text-2xl font-semibold'>My Services</h3>
          <div id='service-buttons' className='flex'>
            <button className='px-4 py-2 bg-primary text-white rounded-full'>
              Nails
            </button>
          </div>
          <div id='service-card-container' className='space-y-4'>
            {/* Create function to generate these dynamically */}
            {renderProducts()}
          </div>
        </div>
        <div className='space-y-2'>
          <h3 className='text-2xl font-semibold'>My Reviews</h3>
          <div className='flex space-x-1'>{renderStars(userInfo.rating)}</div>
          <p className='font-semibold'>
            4.8 <span className='text-blue-400'>(169)</span>
          </p>
          <div id='aesthetician-reviews-container' className='py-4 space-y-4'>
            {renderReviews()}
          </div>
        </div>
        <div className='space-y-4'>
          <h3 className='text-2xl font-semibold'>My Story</h3>
          <p className=''>{userInfo.user_story}</p>
        </div>
        <div className='space-y-4'>
          <h3 className='text-2xl font-semibold'>My Location</h3>
          <p className='text-sm italic'>
            For your privacy, your exact location will remain hidden until the
            booking is confirmed!
          </p>
          {/* <img
            src='/static/aesthetician-page-google-maps-example.jpg'
            className='rounded-lg'
          /> */}
          <Map lat={userInfo.latitude} lng={userInfo.longitude} />
          <p>Bridge land Area, Calgary, Alberta (4.5 km away)</p>
        </div>
      </div>
      <div className='fixed bottom-0 inset-x-0 flex justify-between items-center px-6 pt-3 pb-safe-bottom bg-white border-t border-gray-300 text-base'>
        <p className='mb-3 text-sm text-neutral-500'>
          As soon as{' '}
          <span className='underline underline-offset-4'>Today, 3:00 PM</span>
        </p>
        <button className='mb-3 py-2 px-3 rounded-xl bg-primary text-white'>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default AestheticiansPage;
