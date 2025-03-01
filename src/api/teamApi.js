import axios from '@axios/axios';

/** 팀 목록 가져오기 */
export const getTeamList = async () => {
  const response = await axios.get(`/api/team/all`);
  return response.data;
};

/** 팀 생성 */
export const createTeam = async (payload) => {
  const response = await axios.post(`/api/team`, payload);
  return response.data;
};

/** 팀 수정 */
export const updateTeam = async (teamId, payload) => {
  const response = await axios.put(`/api/team/${teamId}`, payload);
  return response.data;
};

/** 팀 삭제 */
export const deleteTeam = async (teamId) => {
  const response = await axios.delete(`/api/team/${teamId}`);
  return response.data;
};

/** 팀 멤버 리스트 가져오기 */
export const getTeamMember = async (teamId) => {
  const response = await axios.get(`/api/team/${teamId}/member`);
  return response.data;
};

/** 팀 멤버 초대 */
export const inviteMember = async (teamId, payload) => {
  const response = await axios.post(`/api/team/${teamId}/invite`, payload);
  return response.data;
};
