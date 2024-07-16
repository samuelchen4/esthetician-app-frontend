import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
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
      <div className='animate-slideInUp bg-white h-full p-8 max-w-md w-full relative'>
        <button
          className='text-3xl absolute top-5 right-6 text-gray-600 hover:text-gray-800'
          onClick={onClose}
        >
          &times;
        </button>
        <div className='mt-4'>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
