import axios from 'axios';

const baseURL =
  process.env.REACT_APP_PROXY ||
  'https://4gjxuivkec.execute-api.us-west-2.amazonaws.com';
// creates a custom instance of axios
const api = axios.create({
  baseURL,
});

export default api;
