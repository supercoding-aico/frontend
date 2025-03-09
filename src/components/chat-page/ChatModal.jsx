import { useState } from 'react';
import { XCircle, MessageCircle, PlusCircle } from 'react-feather';
import ReactDOM from 'react-dom';
import '@styles/components/common/modal.scss';
import '@styles/components/chat-page/chat-modal.scss';
import Button from '@components/common/Button';

const ChatModal = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log('메시지 전송:', message);
    setMessage('');
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='chat-modal'>
        <header className='chat-modal__header'>
          <h3>Chat</h3>
          <button onClick={onClose} className='chat-modal__header--close'>
            <XCircle size={24} />
          </button>
        </header>

        <div className='chat-modal__content'>
          <p className='chat-placeholder'>Chat messages will appear here...</p>
        </div>

        <div className='chat-modal__input-container'>
          <input
            type='text'
            placeholder='메세지를 입력해주세요.'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='chat-modal__input'
          />
          <button onClick={handleSendMessage} className='chat-modal__send'>
            <MessageCircle size={20} />
          </button>
        </div>

        <footer className='chat-modal__footer'>
          <Button type='button' theme='accent' className='chat-modal__footer-button'>
            <PlusCircle size={20} />
            회의록 작성
          </Button>
        </footer>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default ChatModal;
