import axios from 'axios';
import { getToken } from '@utils/handleToken';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const accessToken = getToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
