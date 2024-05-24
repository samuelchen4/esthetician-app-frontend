import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

const Header = () => {
  return (
    <div
      id='header-container'
      className='sticky top-0 bg-white shadow-sm z-50 w-full flex justify-between p-2'
    >
      <Link to='/home'>
        <img src='/static/esthetician-app-logo.png' alt='logo' />
      </Link>
      {/* <input type='text' className='w-[35%] border rounded-md' /> */}
      {/* <div className='w-[30%] flex justify-between items-center border'>
        <h3>Explore</h3>
        <h3>Stats</h3>
        <h3>Resource</h3>
        <h3>Create</h3>
      </div> */}
      {/* <button>
        <CgProfile size={26} />
      </button> */}
      <button className='px-7 py-1 border rounded-lg bg-primary border-primary text-white'>
        Sign in
      </button>
    </div>
  );
};

export default Header;
