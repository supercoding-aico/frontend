import '@styles/components/layout-page/profile-modal.scss';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';
import AuthForm from '@components/auth-page/AuthForm';
import placeholder from '@assets/images/profile-placeholder.png';

const ProfileModal = ({ closeProfileModal }) => {
  //TODO: CSS Module로 변경
  const updateImage = () => {};
  const updateName = () => {};
  const updatePhoneNumber = () => {};

  return (
    <Modal onClose={closeProfileModal} onClick={() => {}}>
      <div>
        <img src={placeholder} alt='사용자 프로필 사진' className='profile__img' />
        <input type='file' onChange={updateImage} />
      </div>
      <AuthForm />
    </Modal>
  );
};

export default ProfileModal;
