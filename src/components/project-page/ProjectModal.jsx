import '@styles/components/project-page/project-modal.scss';
import Modal from '@components/common/Modal';
import FormInput from '@components/common/FormInput';
import { useCreateSchedule } from '@hooks/schedule/useSchedule';
import { PROJECT_STATUS } from '@constants/projectStatus';

const ProjectModal = ({ closeProjectModal }) => {
  const { mutate: createSchedule } = useCreateSchedule();

  const projectFormFields = [
    { id: 'content', label: '내용', type: 'text' },
    { id: 'startDate', label: '시작일', type: 'date' },
    { id: 'endDate', label: '종료일', type: 'date' },
    { id: 'status', label: '상태', type: 'radio', options: PROJECT_STATUS },
    { id: 'users', label: '담당자', type: 'text' },
  ];

  return (
    <Modal onClose={closeProjectModal}>
      <form className='project-modal__form-container'>
        {projectFormFields.map((field, i) => {
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
      </form>
    </Modal>
  );
};

export default ProjectModal;
