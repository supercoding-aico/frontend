import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {
  getTeamSchedule,
  getUserSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '@api/scheduleApi';

export const useTeamSchedule = (teamId) => {
  return useQuery({
    queryKey: ['teamSchedule', teamId],
    queryFn: () => getTeamSchedule(teamId),
    enabled: !!teamId,
  });
};

export const useUserSchedule = (teamId) => {
  return useQuery({
    queryKey: ['userSchedule', teamId],
    queryFn: () => getUserSchedule(teamId),
    enabled: !!teamId,
  });
};

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: createSchedule,
  });
};
