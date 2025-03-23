import axios from '@axios/axios';

export const getMeetingList = async (teamId) => {
  const response = await axios.get(`/api/meeting/${teamId}?page=0`);
  return response.data;
};

export const postMeetingSummary = async ({ teamId, messages }) => {
  const response = await axios.post(`/api/meeting/${teamId}`, messages);
  return response.data;
};

export const updateMeeting = async ({ meetingId, payload }) => {
  const response = await axios.put(`/api/meeting/${meetingId}`, payload);
  return response.data;
};

export const deleteMeeting = async (meetingId) => {
  const response = await axios.delete(`/api/meeting/${meetingId}`);
  return response.data;
};
