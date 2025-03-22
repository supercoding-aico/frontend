import ChatRoom from '@components/chat-page/ChatRoom';
import { ToastContainer } from 'react-toastify';

const ChatPage = () => {
  return (
    <div className='chat-page'>
      <ChatRoom />
      <ToastContainer position='top-right' autoClose={1500} />
    </div>
  );
};

export default ChatPage;
