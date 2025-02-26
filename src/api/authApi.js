import axios from '@axios/axios';

export const signup = async (payload) => {
  const resp = await axios.post(`api/auth/sign-up`, payload);
  return resp;
};

export const login = async (payload) => {
  const resp = await axios.post(`api/auth/login`, payload);
  return resp;
};

export const verifyLogin = async (payload) => {
  const resp = await axios.post(`api/auth/login-valid`, payload);
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
