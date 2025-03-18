import '@styles/pages/project-page.scss';
import KanbanBoard from '@components/project-page/KanbanBoard';
import { PROJECT_STATUS } from '@constants/projectStatus';

const ProjectPage = () => {
  return (
    <div className='project-page'>
      <header className='project-page__header'>
        <input type='text' className='search__input' placeholder='검색어를 입력하세요' />
      </header>
      <div className='project-page__board-container'>
        {PROJECT_STATUS.map((status) => (
          <KanbanBoard key={status.id} status={status} />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
