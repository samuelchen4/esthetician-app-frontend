import api from 'src/api/api-config';

export const getProductsApi = async (userId) => {
  try {
    const { data } = await api.get(`/api/products/users/${userId}`);
    console.log('data: ', data);
    const products = data.data;
    return products;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Frontend error in getProductsApi method'
    );
  }
};
