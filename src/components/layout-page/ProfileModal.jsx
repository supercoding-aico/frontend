import { useSelector } from 'react-redux';
import { Camera } from 'react-feather';
import '@styles/components/layout-page/profile-modal.scss';
import Modal from '@components/common/Modal';
import { useLogout } from '@hooks/user/useAuth';
import { useUpdateProfileImage } from '@hooks/user/useUser';

const ProfileModal = ({ closeProfileModal }) => {
  const user = useSelector((state) => state.user.userInfo);

  const { mutate: logoutMutate } = useLogout();
  const { mutate: profileImageUpdateMutate } = useUpdateProfileImage();

  // TODO: 사진 업로드 이후 프로필 이미지 즉시 업데이트 되도록 수정
  const updateImage = (e) => {
    const formData = new FormData();
    const image = e.target.files[0];
    formData.append('profileImage', image);
    profileImageUpdateMutate(formData);
  };
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
      <button onClick={logoutMutate}>로그아웃</button>
    </Modal>
  );
};

export default ProfileModal;
