import axios from '@axios/axios';

export const getMeetingList = async (teamId) => {
  const response = await axios.get(`/api/meeting/${teamId}?page=0`);
  return response.data;
};

export const postMeetingSummary = async ({ teamId, messages }) => {
  const response = await axios.post(`/api/meeting/${teamId}`, messages);
  return response.data;
};
