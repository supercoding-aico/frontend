import axios from '@axios/axios';

export const signup = async (payload) => {
  const resp = await axios.post(`api/auth/sign-up`, payload);
  return resp.data;
};

export const login = async (payload) => {
  const resp = await axios.post(`api/auth/login`, payload);
  return resp.data;
};
