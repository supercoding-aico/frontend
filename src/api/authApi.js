import axios from '@axios/axios';

export const signup = async ({ payload, queryString }) => {
  const resp = await axios.post(`api/auth/sign-up?${queryString}`, payload);
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

// TODO: 토큰 재발급 로직 추가
export const refreshToken = async () => {
  const resp = await axios.post(`api/auth/token/refresh`);
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
