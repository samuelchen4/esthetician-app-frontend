import React from 'react';
import useUserStore from 'src/stores/useUserStore';

export const useUser = () => {
  const user = useUserStore((state) => state.user);

  const isUserLoggedIn = () => {
    if (user === null) {
      return false;
    }
    return true;
  };

  return { isUserLoggedIn };
};
