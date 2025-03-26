import { useDispatch, useSelector } from 'react-redux';
import { Edit2 } from 'react-feather';
import { useRef } from 'react';
import '@styles/components/layout-page/profile-modal.scss';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';
import Button from '@components/common/Button';
import { useLogout } from '@hooks/user/useAuth';
import { useUpdateProfileImage, useUpdateProfileInfo } from '@hooks/user/useUser';
import { updateUserProfile } from '@redux/slice/userSlice';
import { formatPhoneNumber } from '@utils/formatPhoneNumber';

const ProfileModal = ({ closeProfileModal }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  const fileInputRef = useRef(null);

  const { mutate: logout } = useLogout();
  const { mutate: profileImageUpdate } = useUpdateProfileImage();
  const { mutate: profileInfoUpdate } = useUpdateProfileInfo();

  const infoFields = [
    {
      id: 'nickname',
      label: '닉네임',
      value: user.nickname,
      buttonProps: (
        <Button type='submit' theme='accent'>
          수정
        </Button>
      ),
    },
    {
      id: 'phoneNumber',
      label: '전화번호',
      value: formatPhoneNumber(user.phoneNumber),
    },
    { id: 'email', label: '이메일', value: user.email },
  ];

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const updateImage = (e) => {
    const formData = new FormData();
    const image = e.target.files[0];
    formData.append('profileImage', image);
    profileImageUpdate(formData, {
      onSuccess: (data) => {
        dispatch(updateUserProfile({ imageUrl: data.data }));
        closeProfileModal();
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = {};

    formData.forEach((value, key) => {
      if (key === 'phoneNumber') {
        formValues[key] = value.replace(/-/g, '');
        return;
      }

      formValues[key] = value;
    });

    profileInfoUpdate(formValues, {
      onSuccess: () => {
        dispatch(updateUserProfile({ nickname: formValues.nickname }));
        closeProfileModal();
      },
    });
  };

  return (
    <Modal onClose={closeProfileModal}>
      <div className='profile-modal'>
        <figure className='image-container'>
          <label htmlFor='profileImage' className='image'>
            <button onClick={handleButtonClick} className='image__button'>
              <Edit2 />
            </button>
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
        <div className='info-container'>
          <form onSubmit={handleSubmit} className='info'>
            {infoFields.map((field) => (
              <FormInput
                key={field.id}
                name={field.id}
                label={field.label}
                value={field.value}
                button={field.buttonProps}
                readOnly={!field.buttonProps}
              />
            ))}
          </form>
          <button onClick={logout}>로그아웃</button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
