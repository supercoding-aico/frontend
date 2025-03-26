import { useParams } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { useEffect, useState } from 'react';
import '@styles/pages/project-page.scss';
import FormInput from '@components/common/FormInput';
import KanbanBoard from '@components/project-page/KanbanBoard';
import ProjectModal from '@components/project-page/ProjectModal';
import { useGetTeamSchedule, useUpdateSchedule } from '@hooks/schedule/useSchedule';
import { getMonthQueryString } from '@utils/getMonthQueryString';
import { PROJECT_STATUS } from '@constants/projectStatus';

const ProjectPage = () => {
  const { firstDay, lastDay, queryString } = getMonthQueryString();
  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const { teamId } = useParams();
  const { data } = useGetTeamSchedule(teamId, queryString);
  const { mutate: updateSchedule } = useUpdateSchedule();

  const DATE_INPUTS = [
    { id: 'startDate', type: 'date', value: startDate },
    { id: 'endDate', type: 'date', value: endDate },
  ];

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  useEffect(() => {
    if (data?.data) {
      setTasks(data.data);
    }
  }, [data]);

  const onChangeDate = (field) => {
    console.log(field);
  };

  console.log(startDate, endDate);

  return (
    <>
      <div className='project-page'>
        <header className='header'>
          <div className='header__date-inputs'>
            {DATE_INPUTS.map((field) => (
              <FormInput
                key={field.id}
                name={field.id}
                type={field.type}
                value={field.value}
                onChange={(field) => onChangeDate(field)}
              />
            ))}
          </div>
          <button onClick={() => setIsProjectModalOpen(true)} className='header__button'>
            <PlusCircle />
          </button>
        </header>
        <div className='board-container'>
          {PROJECT_STATUS.map((status) => {
            const filteredTasks = tasks.filter((task) => task.status === status.id);
            return <KanbanBoard key={status.id} status={status} tasks={filteredTasks} />;
          })}
        </div>
      </div>
      {isProjectModalOpen && <ProjectModal closeProjectModal={closeProjectModal} />}
    </>
  );
};

export default ProjectPage;
