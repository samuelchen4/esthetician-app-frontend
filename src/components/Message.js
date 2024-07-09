import React, { useEffect, useState } from 'react';

const Message = ({ message, messageType, setVisible }) => {
  const [animation, setAnimation] = useState('slideIn');

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation('slideOut');
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 500); // Duration of slideOut animation
      return () => clearTimeout(hideTimer);
    }, 3000); // Change the duration as needed
    return () => clearTimeout(timer);
  }, [setVisible]);

  const boxStyle =
    messageType === 'error' ? 'bg-danger text-white' : 'bg-success text-white';

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 mb-4 mx-4 p-4 rounded ${boxStyle} animate-${animation}`}
    >
      {message}
    </div>
  );
};

export default Message;
