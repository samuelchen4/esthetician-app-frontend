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
      className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
      onClick={handleOverlayClick}
    >
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative'>
        <button
          className='absolute top-3 right-3 text-gray-600 hover:text-gray-800'
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
