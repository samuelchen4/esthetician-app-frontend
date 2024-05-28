import axios from 'axios';

// const baseURL = process.env.REACT_APP_PROXY || 'http://34.218.254.87:5000';
const baseURL = process.env.REACT_APP_PROXY || 'http://localhost:5000';
// creates a custom instance of axios
const api = axios.create({
  baseURL,
});

export default api;
