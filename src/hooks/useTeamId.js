import { useLocation } from 'react-router-dom';

const useTeamId = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/team\/(\d+)\/calendar/);
  return match ? match[1] : null;
};

export default useTeamId;
