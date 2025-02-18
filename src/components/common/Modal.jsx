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
          {onClose && <Button type='button' name='취소' theme='cancel' onClick={onClose} />}
          {onClick && <Button type='button' name='확인' theme='primary' onClick={onClick} />}
        </footer>
      </div>
    </div>,
    document.getElementById('modal')
  );
};

export default Modal;
