import { useLocation } from 'react-router-dom';
import { PlusCircle } from 'react-feather';
import { useState } from 'react';
import '@styles/pages/project-page.scss';
import KanbanBoard from '@components/project-page/KanbanBoard';
import ProjectModal from '@components/project-page/ProjectModal';
import { createSchedule } from '@api/scheduleApi';
import { PROJECT_STATUS } from '@constants/projectStatus';

const ProjectPage = () => {
  const location = useLocation();

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const match = location.pathname.match(/\/team\/(\d+)\/project/);
  const teamId = match ? match[1] : null;

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  return (
    <>
      <div className='project-page'>
        <header className='header'>
          <input type='text' className='header__input' placeholder='검색어를 입력하세요' />
          <button onClick={() => setIsProjectModalOpen(true)} className='header__button'>
            <PlusCircle />
          </button>
        </header>
        <div className='board-container'>
          {PROJECT_STATUS.map((status) => (
            <KanbanBoard key={status.id} status={status} />
          ))}
        </div>
      </div>
      {isProjectModalOpen && <ProjectModal closeProjectModal={closeProjectModal} />}
    </>
  );
};

export default ProjectPage;
