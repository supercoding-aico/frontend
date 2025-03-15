import axios from '@axios/axios';

export const updateProfileImage = async (payload) => {
  const resp = await axios.put(`api/user/info/image`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return resp.data;
};

export const updateProfileInfo = async (payload) => {
  const resp = await axios.put(`api/user/info`, payload);
  return resp.data;
};
