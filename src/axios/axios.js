import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: 예외처리 디테일 추가 필요
    console.error('API 요청 실패:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
