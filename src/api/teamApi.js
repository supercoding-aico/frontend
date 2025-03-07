import axios from '@axios/axios';

export const getTeamList = async () => {
  const response = await axios.get(`/api/team/all`);
  return response.data;
};

export const createTeam = async (payload) => {
  const response = await axios.post(`/api/team`, payload);
  return response.data;
};

export const updateTeam = async (teamId, payload) => {
  const response = await axios.put(`/api/team/${teamId}`, payload);
  return response.data;
};

export const deleteTeam = async (teamId) => {
  const response = await axios.delete(`/api/team/${teamId}`);
  return response.data;
};

export const getTeamMember = async (teamId) => {
  const response = await axios.get(`/api/team/${teamId}/member`);
  return response.data;
};

export const inviteMember = async (teamId, payload) => {
  const response = await axios.post(`/api/team/${teamId}/invite`, payload);
  return response.data;
};

export const removeMember = async (teamId, payload) => {
  const response = await axios.delete(`api/team/leave/${teamId}`, { data: payload });
  return response.data;
};
