import api from './api-config';

// Call login API
export const login = async (username, password) => {
  try {
    const response = await api.post('/api/user/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};
