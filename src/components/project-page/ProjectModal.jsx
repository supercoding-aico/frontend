import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTeamMember } from '@api/teamApi';
import { useRef, useState } from 'react';
import '@styles/components/project-page/project-modal.scss';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';
import { useCreateSchedule } from '@hooks/schedule/useSchedule';
import { PROJECT_FORM_FIELDS } from '@constants/projectFormFields';

//TODO: 코드 깔끔하게 정리 필요
const ProjectModal = ({ closeProjectModal }) => {
  const formRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { teamId } = useParams();

  const { mutate: createSchedule } = useCreateSchedule(teamId);

  // TODO: hook으로 분리
  const { data } = useQuery({
    queryKey: ['teamMembers', teamId],
    queryFn: () => getTeamMember(teamId),
    enabled: !!teamId,
  });
  const memberData = data?.data;

  const selectUser = (memberId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.some((userId) => userId === memberId)) {
        return prevSelected.filter((userId) => userId !== memberId);
      }
      return [...prevSelected, memberId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const schedule = {
      content: formData.get('content'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      scheduleStatus: formData.get('scheduleStatus'),
      users: selectedUsers,
    };

    createSchedule(schedule);
    closeProjectModal();
  };

  return (
    <Modal onClose={closeProjectModal} onClick={() => formRef.current?.requestSubmit()}>
      <form onSubmit={handleSubmit} ref={formRef} className='project-modal__form-container'>
        {PROJECT_FORM_FIELDS.map((field, i) => {
          const className =
            i === 1 || i === 2 ? 'project-modal__form-item--half' : 'project-modal__form-item';
          return (
            <div key={field.id} className={className}>
              <FormInput
                name={field.id}
                label={field.label}
                type={field.type}
                options={field.options}
              />
            </div>
          );
        })}
        <button type='button' onClick={() => setIsDropdownOpen(true)}>
          담당자 추가
        </button>
        {isDropdownOpen && (
          <div>
            {memberData?.map((member) => (
              <button type='button' key={member.userId} onClick={() => selectUser(member.userId)}>
                {member.nickname}
              </button>
            ))}
          </div>
        )}
      </form>
    </Modal>
  );
};

export default ProjectModal;
