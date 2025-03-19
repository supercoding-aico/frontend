import '@styles/components/project-page/kanban-board.scss';

const KanbanBoard = ({ status }) => {
  return (
    <section className='board-wrapper'>
      <div>
        <span>{status.emoji}</span>
        <span>{status.name}</span>
      </div>
      <ul className='board'>
        <li></li>
      </ul>
    </section>
  );
};

export default KanbanBoard;
