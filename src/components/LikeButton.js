import React, { useState } from 'react';
import useUserStore from 'src/stores/useUserStore';
import { cn } from 'src/lib/utils';
import { Heart } from 'lucide-react';
import { useLikes } from 'src/hooks/useLikes';
import Modal from 'src/components/Modal';

const LikeButton = ({ aestheticianId, size = '20', className }) => {
  const user = useUserStore((state) => state.user);
  const { liked, toggleLiked } = useLikes(user?._id, aestheticianId);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModalOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Modal isOpen={modalOpen}>
        <h3>This is the modal</h3>
      </Modal>

      <button
        className={cn(
          'border border-gray-400 p-1.5 rounded-full shadow-sm bg-white text-black',
          className
        )}
        onClick={user?._id ? toggleLiked : toggleModalOpen}
      >
        <Heart
          size={size}
          className={cn(liked && 'fill-primary stroke-primary')}
        />
      </button>
    </>
  );
};

export default LikeButton;
