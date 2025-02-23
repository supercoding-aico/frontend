import instance from '@axios/axios';

const setToken = (accessToken) => {
  if (accessToken) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};
export default setToken;
