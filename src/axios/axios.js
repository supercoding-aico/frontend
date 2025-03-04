import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
