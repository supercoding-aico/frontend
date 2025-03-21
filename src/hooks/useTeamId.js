import { useLocation } from 'react-router-dom';

export const useTeamId = () => {
  const location = useLocation();
  const teamId = location.pathname.split('/')[2];
  return teamId;
};
