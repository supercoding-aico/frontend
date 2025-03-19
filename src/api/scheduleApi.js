import axios from '@axios/axios';

export const getTeamSchedule = async (teamId) => {
  const resp = await axios.get(`api/schedule/${teamId}`);
  return resp;
};

export const getUserSchedule = async (teamId) => {
  const resp = await axios.get(`api/schedule/me/${teamId}`);
  return resp;
};

export const createSchedule = async (teamId, payload) => {
  const resp = await axios.post(`api/schedule/${teamId}`, payload);
  return resp;
};

export const updateSchedule = async (scheduleId, payload) => {
  const resp = await axios.put(`api/schedule/${scheduleId}`, payload);
  return resp;
};

export const deleteSchedule = async (scheduleId) => {
  const resp = await axios.delete(`api/schedule/${scheduleId}`);
  return resp;
};
