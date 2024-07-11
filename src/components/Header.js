import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import Modal from './Modal';
import useAuthStore from '../stores/useAuthStore';

const Header = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // From Zustand store
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      await login(username, password);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      id='header-container'
      className='sticky top-0 z-100 bg-white shadow-sm w-full flex justify-between p-2'
    >
      <Link to='/home'>
        <img
          src='/static/beauty_connect_logo_2_compressed.png'
          alt='logo'
          className='h-8 w-auto'
        />
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
      {user ? (
        <button>
          <CgProfile size={32} />
        </button>
      ) : (
        <button
          onClick={openModal}
          className='px-4 py-1 text-xs border rounded-lg bg-primary border-primary text-white'
        >
          Sign in
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className='text-2xl font-semibold mb-4'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='border rounded-lg bg-primary border-primary text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline'
            >
              Sign In
            </button>
            <button
              type='button'
              className='inline-block align-baseline font-bold text-sm text-primary'
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Header;
