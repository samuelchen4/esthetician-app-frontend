import React from 'react';
import { MoveLeft, Heart, Instagram } from 'lucide-react';
import CircleImage from 'src/components/CircleImage';
import { Button } from 'src/components/ui/button';
import Carousel from 'src/components/Carousel';
import GoogleMapReact from 'google-map-react';

const images = [
  '/static/nails-1.png',
  '/static/nails-2.png',
  '/static/nails-3.png',
  '/static/nails-4.png',
  '/static/nails-5.png',
];

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const AetheticiansPage = () => {
  return (
    <div className='flex flex-col text-neutral-500 text-base p-4 space-y-10 font-roboto'>
      <div id='aetheticians-page-top' className='border flex justify-between '>
        <MoveLeft size='24' />
        <Heart size='24' />
      </div>
      <div
        id='aetheticians-page-basic-info'
        className='border flex space-x-10 text-sm'
      >
        <CircleImage
          size='90'
          src='/static/client-card-profile-picture-2.png'
          className='shadow-md border'
        />
        <div className='flex flex-col justify-center'>
          <h3 className='text-3xl font-light mb-2'>Steven Bai</h3>
          <p>Nails</p>
          <p>Calgary, Ab</p>
        </div>
      </div>
      <div
        id='aetheticians-page-buttons'
        className='flex justify-center space-x-4'
      >
        <Button className='border rounded-3xl bg-blue-200 border-blue-200 shadow-sm'>
          <Instagram size='24' />
        </Button>
        <Button className='border rounded-3xl bg-blue-200 border-blue-200 shadow-sm'>
          Book Now
        </Button>
      </div>
      <div id='aetheticians-page-portfolio' className=' space-y-2'>
        <div className='flex justify-between'>
          <h4 className='font-semibold font-lg text-black'>Portfolio</h4>
          <p className='text-gray-400 text-sm '>See all</p>
        </div>
        <Carousel
          width={200}
          state={images}
          className='space-x-4 px-0 opacity-80'
        />
      </div>
      <div id='aetheticians-page-about-me' className='space-y-2'>
        <div className='flex justify-between'>
          <h4 className='font-semibold font-lg text-black'>My Story</h4>
          {/* <p className='text-gray-400 text-sm '>See all</p> */}
        </div>
        <p>
          Hey there! I’m [Your Name], a passionate nail stylist based in the
          vibrant city of Calgary, Alberta. Ever since I can remember, I’ve been
          obsessed with all things creative and colorful, and that’s exactly
          what led me to the world of nails! From intricate designs to bold,
          statement-making sets, I love turning my clients’ nails into mini
          works of art that express their unique personalities.
        </p>
      </div>
      <div id='aetheticians-page-portfolio' className=' space-y-2'>
        <div className='flex justify-between'>
          <h4 className='font-semibold font-lg text-black'>Location</h4>
          <p className='text-gray-400 text-sm '>See all</p>
        </div>
        <div>
          <p>Location</p>
          <div className='h-14 w-auto'></div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <p>This is my marker</p>
          </GoogleMapReact>
        </div>
      </div>
    </div>
  );
};

export default AetheticiansPage;
