import { useSelector } from 'react-redux';
import { Camera } from 'react-feather';
import '@styles/components/layout-page/profile-modal.scss';
import Modal from '@components/common/Modal';

const ProfileModal = ({ closeProfileModal }) => {
  const user = useSelector((state) => state.user.userInfo);

  // console.log(user);

  const updateImage = () => {};
  // const updateName = () => {};
  // const updatePhoneNumber = () => {};

  return (
    <Modal onClose={closeProfileModal}>
      <figure className='profile__image'>
        <label htmlFor='profile-img'>
          <img src={user.imageUrl} alt='사용자 프로필 사진' className='profile__image--preview' />
          <div className='profile__image--hover'>
            <Camera />
          </div>
        </label>
        <input
          type='file'
          id='profile-img'
          onChange={updateImage}
          className='profile__image--hidden'
        />
      </figure>
    </Modal>
  );
};

export default ProfileModal;
