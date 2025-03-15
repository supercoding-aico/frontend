import { useDispatch, useSelector } from 'react-redux';
import { Edit2 } from 'react-feather';
import { useRef } from 'react';
import '@styles/components/layout-page/profile-modal.scss';
import Modal from '@components/common/Modal';
import { useLogout } from '@hooks/user/useAuth';
import { useUpdateProfileImage } from '@hooks/user/useUser';
import { updateUserProfile } from '@redux/slice/userSlice';

const ProfileModal = ({ closeProfileModal }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  const fileInputRef = useRef(null);

  const { mutate: logoutMutate } = useLogout();
  const { mutate: profileImageUpdateMutate } = useUpdateProfileImage();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const updateImage = (e) => {
    const formData = new FormData();
    const image = e.target.files[0];
    formData.append('profileImage', image);
    profileImageUpdateMutate(formData, {
      onSuccess: (data) => {
        dispatch(updateUserProfile({ imageUrl: data.data }));
      },
    });
  };
  // const updateName = () => {};
  // const updatePhoneNumber = () => {};

  return (
    <Modal onClose={closeProfileModal}>
      <figure className='image-container'>
        <button onClick={handleButtonClick} className='image-container__icon'>
          <Edit2 />
        </button>
        <label htmlFor='profileImage' className='image'>
          <img src={user.imageUrl} alt='사용자 프로필 사진' className='image__preview' />
          <input
            type='file'
            id='profileImage'
            onChange={updateImage}
            ref={fileInputRef}
            className='image__input'
          />
        </label>
      </figure>
      <button onClick={logoutMutate}>로그아웃</button>
    </Modal>
  );
};

export default ProfileModal;
