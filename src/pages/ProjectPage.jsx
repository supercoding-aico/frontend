import { useParams } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState, useCallback, useMemo } from 'react';
import '@styles/pages/project-page.scss';
import FormInput from '@components/common/FormInput';
import KanbanBoard from '@components/project-page/KanbanBoard';
import ProjectModal from '@components/project-page/ProjectModal';
import { useGetTeamSchedule, useUpdateSchedule } from '@hooks/schedule/useSchedule';
import { getMonthQueryString } from '@utils/getMonthQueryString';
import { PROJECT_STATUS } from '@constants/projectStatus';

const ProjectPage = () => {
  const { firstDay, lastDay, queryString } = getMonthQueryString();
  const { teamId } = useParams();
  const { data } = useGetTeamSchedule(teamId, queryString);
  const { mutate: updateSchedule } = useUpdateSchedule();

  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(lastDay);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  let updatedTask;

  const dateInputs = useMemo(
    () => [
      { id: 'startDate', type: 'date', value: startDate },
      { id: 'endDate', type: 'date', value: endDate },
    ],
    [startDate, endDate]
  );

  const handleDateChange = (field) => {
    //TODO: api request
  };

  const moveTask = useCallback(
    (taskId, newStatus) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.scheduleId === taskId) {
            const updatedTask = { ...task, status: newStatus };
            updateSchedule(updatedTask);
            return updatedTask;
          }
          return task;
        })
      );
    },
    [updateSchedule]
  );

  const closeProjectModal = () => setIsProjectModalOpen(false);

  useEffect(() => {
    if (data?.data) {
      setTasks(data.data);
    }
  }, [data]);

  return (
    <>
      <div className='project-page'>
        <header className='header'>
          <div className='header__date-inputs'>
            {dateInputs.map((field) => (
              <FormInput
                key={field.id}
                name={field.id}
                type={field.type}
                value={field.value}
                onChange={handleDateChange}
              />
            ))}
          </div>
          <button onClick={() => setIsProjectModalOpen(true)} className='header__button'>
            <PlusCircle />
          </button>
        </header>
        <DndProvider backend={HTML5Backend}>
          <div className='board-container'>
            {PROJECT_STATUS.map((status) => {
              const filteredTasks = tasks.filter((task) => task.status === status.id);
              return (
                <KanbanBoard
                  key={status.id}
                  status={status}
                  tasks={filteredTasks}
                  moveTask={moveTask}
                />
              );
            })}
          </div>
        </DndProvider>
      </div>
      {isProjectModalOpen && <ProjectModal closeProjectModal={closeProjectModal} />}
    </>
  );
};

export default ProjectPage;
