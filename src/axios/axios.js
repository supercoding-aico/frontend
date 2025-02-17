import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
  withCredentials: true,
});
export default instance;
