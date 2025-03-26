import { Inbox } from 'react-feather';
import '@styles/components/common/empty-state.scss';

const EmptyState = ({ message = '아무것도 없어요!' }) => {
  return (
    <div className='empty-state'>
      <Inbox />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
