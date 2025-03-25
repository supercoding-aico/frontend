import axios from '@axios/axios';

export const getNotification = async () => {
  const resp = await axios.get(`api/notification/notifications`);
  return resp.data;
};

export const readNotification = async (queryString) => {
  const resp = await axios.put(`api/notification/read?${queryString}`);
  return resp;
};
