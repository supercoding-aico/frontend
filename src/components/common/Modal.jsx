import { XCircle } from 'react-feather';
import ReactDOM from 'react-dom';
import '@styles/components/common/modal.scss';
import Button from '@components/common/Button';

const Modal = ({ children, onClose, onClick }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal'>
        <header className='modal__header'>
          <button onClick={onClose} className='modal__header--close'>
            <XCircle />
          </button>
        </header>
        {children}
        <footer className='modal__footer'>
          {onClose && (
            <Button type='button' theme='primary' onClick={onClose}>
              취소
            </Button>
          )}
          {onClick && (
            <Button type='button' theme='accent' onClick={onClick}>
              확인
            </Button>
          )}
        </footer>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
