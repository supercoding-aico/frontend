import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTeam, deleteTeam, inviteMember, removeMember, updateTeam } from '@api/teamApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useTeamMutations = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: (data) => {
      if (data.code === 201) {
        toast.success('팀이 생성되었습니다.');

        queryClient.invalidateQueries(['teamList']);
      }
    },
    onError: (error) => {
      if (error.response?.data?.code === 401) {
        toast.error('로그인이 필요합니다.');
        navigate('/login');
      } else {
        toast.error('팀 생성 중 오류가 발생했습니다.');
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
      toast.success('팀이 삭제되었습니다.');
    },
    onError: () => {
      toast.error('팀 삭제 실패! 다시 시도해 주세요.');
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
      toast.success('팀 이름이 수정되었습니다.');
    },
    onError: () => {
      toast.error('팀 수정 실패! 다시 시도해 주세요.');
    },
  });

  const inviteMemberMutation = (teamId) =>
    useMutation({
      mutationFn: (email) => inviteMember(teamId, { email }),
      onSuccess: (data) => {
        if (data.code === 200) {
          toast.success('팀 초대 이메일이 발송되었습니다.');
        }
      },
      onError: () => {
        toast.error('팀 초대 이메일 발송이 실패하였습니다. 다시 시도해 주세요요');
      },
    });

  // 팀 멤버 탈퇴시키기(매니저만 가능)
  const removeMemberMutation = useMutation({
    mutationFn: ({ teamId, userId }) => removeMember(teamId, { userId }),
    onSuccess: (_, { teamId, userId }) => {
      queryClient.setQueryData(['teamMembers', teamId], (oldData) =>
        oldData ? { ...oldData, data: oldData.data.filter((m) => m.userId !== userId) } : oldData
      );
      toast.success('멤버를 성공적으로 탈퇴시켰습니다.');
    },
    onError: () => {
      toast.error('멤버 탈퇴에 실패했습니다.');
    },
  });

  const leaveMutation = (teamId, loggedInUserId) =>
    useMutation({
      mutationFn: () => removeMember(teamId, loggedInUserId),
      onSuccess: (data) => {
        if (data.code === 204) {
          toast.success('팀에서 탈퇴했습니다.');
          navigate('/team');
        }
      },
      onError: () => {
        toast.error('팀 탈퇴에 실패했습니다.');
      },
    });

  return {
    createMutation,
    deleteMutation,
    updateMutation,
    inviteMemberMutation,
    removeMemberMutation,
    leaveMutation,
  };
};

export default useTeamMutations;
