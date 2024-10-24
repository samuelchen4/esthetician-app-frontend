import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();

  const [page, setPage] = useState();

  const goPreviousPage = () => {
    navigate(-1);
  };

  const goToPage = (route) => {
    navigate(route);
  };

  const getCurrentPage = () => {
    const path = window.location.pathname;
    // console.log('path: ', path);

    // edge case
    if (path === '/') {
      return 'explore';
    }

    const regex = /^\/([^\/]+)/;
    const match = path.match(regex);

    if (match) {
      const newPage = match[1];
      // console.log(newPage);
      return newPage;
    }
  };

  useEffect(() => {
    const newPage = getCurrentPage();
    setPage(newPage);
  }, [location]);

  return { page, goPreviousPage, goToPage, params };
};
