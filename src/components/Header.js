import React, { useRef, useState, useEffect } from 'react';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import Modal from './Modal';
import useAuthStore from '../stores/useAuthStore';
import { Button } from 'src/components/ui/button';
import useHeaderStore from '../stores/useHeaderStore';

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

  // header height store
  const headerRef = useRef(null);
  const setHeaderHeight = useHeaderStore((state) => state.setHeaderHeight);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [setHeaderHeight]);

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
      className='sticky top-0 z-100 bg-white shadow-sm flex items-center justify-between py-2 px-6 w-full'
      ref={headerRef}
    >
      <Link to='/'>
        <img
          src='/static/beauty_connect_logo_2_compressed.png'
          alt='logo'
          className='w-12 h-full'
        />
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      {/* {user ? (
        <Button>
          <CgProfile size={32} />
        </Button>
      ) : (
        <Button
          variant={'outline'}
          onClick={openModal}
          className='h-full text-xs'
        >
          Sign in
        </Button>
      )} */}

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
