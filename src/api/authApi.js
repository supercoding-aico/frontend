import axios from '@axios/axios';

export const signup = async (payload) => {
  const resp = await axios.post(`api/auth/sign-up`, payload);
  return resp;
};

export const login = async (payload) => {
  const resp = await axios.post(`api/auth/login`, payload);
  return resp.data;
};

export const verifyLogin = async () => {
  const resp = await axios.get(`api/auth/login-valid`);
  return resp.data;
};

export const logout = async () => {
  const resp = await axios.post(`api/auth/logout`);
  return resp;
};

export const withdraw = async () => {
  const resp = await axios.delete(`api/user/info`);
  return resp;
};

export const isEmailAvailable = async (payload) => {
  const resp = await axios.post(`api/auth/email`, payload);
  return resp.data;
};

export const isNicknameAvailable = async (payload) => {
  const resp = await axios.post(`api/auth/nickname`, payload);
  return resp.data;
};
