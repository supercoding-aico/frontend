import { useLocation } from 'react-router-dom';

const useTeamId = () => {
  const location = useLocation();
  const teamId = location.pathname.split('/')[2];
  return teamId;
};

export default useTeamId;
