import { useState, useEffect } from 'react';
import { getUserInfoById } from 'src/api/usersApi';
import { getServicesById } from 'src/api/servicesApi';
import { getProductsApi } from 'src/api/productsApi';
import { getReviewsApi } from 'src/api/reviewsApi';
import { getPhotosById } from 'src/api/photosApi';

export const useAestheticiansDataFetch = (id) => {
  if (!id) throw new Error('aestheticianId required!');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [services, setServices] = useState([]);

  getUserInfoById(id);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const results = await Promise.allSettled([
        getUserInfoById(id),
        getProductsApi(id),
        getReviewsApi(id),
        getPhotosById(id),
        getServicesById(id),
      ]);
      console.log('results: ', results);

      const [
        userInfoResults,
        productResults,
        reviewResults,
        photoResults,
        serviceResults,
      ] = results;

      try {
        if (userInfoResults.status === 'fulfilled') {
          setUserInfo(userInfoResults.value);
        }

        if (productResults.status === 'fulfilled') {
          setProducts(productResults.value);
        }

        if (reviewResults.status === 'fulfilled') {
          setReviews(reviewResults.value);
        }

        if (photoResults.status === 'fulfilled') {
          setPhotos(photoResults.value);
        }

        if (serviceResults.status === 'fulfilled') {
          setServices(serviceResults.value);
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { userInfo, products, reviews, photos, services, isLoading, error };
};
