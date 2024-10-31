import { useState, useEffect } from 'react';
import useLikesStore from 'src/stores/useLikesStore';

export const useLikes = (userId, aestheticianId) => {
  const likes = useLikesStore((state) => state.likes);
  //   const likesLoading = useLikesStore((state) => state.isLoading);
  const addLike = useLikesStore((state) => state.addLike);
  const deleteLike = useLikesStore((state) => state.deleteLike);

  // put this into a useLikes custom hook
  const [liked, setLiked] = useState(false);

  const toggleLiked = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (liked) {
      // delete photo api
      deleteLike(userId, aestheticianId);
    } else {
      // add photo api
      addLike(userId, aestheticianId);
    }

    setLiked((prevLiked) => !prevLiked);
  };

  // idk if I like this, we should just block the UI render until userId and aestheticianId are loaded in
  useEffect(() => {
    const isLiked = likes.some(
      (like) => like.aesthetician_id === aestheticianId
    );
    setLiked(isLiked);
  }, [likes, aestheticianId]);

  return {
    liked,
    toggleLiked,
  };
};
