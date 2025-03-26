import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  getTeamSchedule,
  getUserSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '@api/scheduleApi';

export const useGetTeamSchedule = (teamId, queryString) => {
  return useQuery({
    queryKey: ['teamSchedule', teamId, JSON.stringify(queryString)],
    queryFn: () => getTeamSchedule(teamId, queryString),
    enabled: !!teamId,
  });
};

export const useGetUserSchedule = (teamId) => {
  return useQuery({
    queryKey: ['userSchedule', teamId],
    queryFn: () => getUserSchedule(teamId),
    enabled: !!teamId,
  });
};

export const useCreateSchedule = (teamId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (schedule) => createSchedule(teamId, schedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamSchedule', teamId] });
    },
  });
};

export const useUpdateSchedule = () => {
  return useMutation({
    mutationFn: updateSchedule,
  });
};
