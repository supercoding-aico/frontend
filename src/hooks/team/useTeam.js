import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTeam, deleteTeam, inviteMember, removeMember, updateTeam } from '@api/teamApi';
import { useNavigate } from 'react-router-dom';

const useTeamMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: (data) => {
      if (data.code === 201) {
        alert('팀이 생성되었습니다.');
        queryClient.invalidateQueries(['teamList']);
      } else {
        alert('팀 생성 실패! 다시 시도해 주세요.');
      }
    },
    onError: (error) => {
      if (error.response?.data?.code === 401) {
        alert('로그인이 필요합니다.');
        navigate('/login');
      } else {
        alert('팀 생성 중 오류가 발생했습니다.');
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: (data, deletedTeamId) => {
      if (data.code === 200) {
        queryClient.setQueryData(['teamList'], (oldData) =>
          oldData ? oldData.filter((team) => team.teamId !== deletedTeamId) : []
        );
      }
      queryClient.invalidateQueries(['teamList']);
      alert('팀이 삭제되었습니다.');
    },
    onError: () => {
      alert('팀 삭제 실패! 다시 시도해 주세요.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ teamId, name }) => updateTeam(teamId, { name }),
    onSuccess: (data, { teamId, name }) => {
      if (data.code === 200) {
        queryClient.setQueryData(['teamList'], (oldData) =>
          oldData ? oldData.map((team) => (team.teamId === teamId ? { ...team, name } : team)) : []
        );
      }
      queryClient.invalidateQueries(['teamList']);
      alert('팀 이름이 수정되었습니다.');
    },
    onError: () => {
      alert('팀 수정 실패! 다시 시도해 주세요.');
    },
  });

  const inviteMemberMutation = (teamId) =>
    useMutation({
      mutationFn: (email) => inviteMember(teamId, { email }),
      onSuccess: (data) => {
        if (data.code === 200) {
          alert('Invitation sent successfully.');
        }
      },
      onError: (error) => {
        console.error('Invite Failed:', error);
        alert('Failed to send the invitation. Please try again.');
      },
    });

  const leaveMutation = (teamId, loggedInUserId) =>
    useMutation({
      mutationFn: () => removeMember(teamId, loggedInUserId),
      onSuccess: (data) => {
        if (data.code === 201) {
          alert('팀에서 탈퇴했습니다.');
          navigate('/team');
        }
      },
      onError: (error) => {
        console.error('팀 탈퇴 중 오류 발생:', error);
        alert('팀 탈퇴에 실패했습니다.');
      },
    });

  return { createMutation, deleteMutation, updateMutation, inviteMemberMutation, leaveMutation };
};

export default useTeamMutations;
