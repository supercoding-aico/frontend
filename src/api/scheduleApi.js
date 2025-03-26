import axios from '@axios/axios';

export const getTeamSchedule = async (teamId, queryString) => {
  const resp = await axios.get(`api/schedule/${teamId}?${queryString}`);
  return resp.data;
};

export const getUserSchedule = async (teamId) => {
  const resp = await axios.get(`api/schedule/me/${teamId}`);
  return resp;
};

export const createSchedule = async (teamId, payload) => {
  const resp = await axios.post(`api/schedule/${teamId}`, payload);
  return resp;
};

export const updateSchedule = async (payload) => {
  const resp = await axios.put(`api/schedule/${payload.scheduleId}`, payload);
  return resp;
};
