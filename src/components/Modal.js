import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  // Makes body not scrollable with modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50 pt-safe-top'
      onClick={handleOverlayClick}
    >
      <div className='h-full animate-slideInUp bg-white p-6 max-w-md w-full relative'>
        <button
          className='text-3xl absolute top-5 right-6 text-gray-600 hover:text-gray-800'
          onClick={onClose}
        >
          &times;
        </button>
        <div className=' h-full flex flex-col items-center justify-center'>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
