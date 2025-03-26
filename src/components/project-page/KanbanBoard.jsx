import { useDrop } from 'react-dnd';
import '@styles/components/project-page/kanban-board.scss';
import DraggableTask from '@components/project-page/DraggableTask';

const KanbanBoard = ({ status, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      moveTask(item.id, status.id);
    },
  });

  return (
    <section ref={drop} className='board-wrapper'>
      <div>
        <span>{status.emoji}</span>
        <span>{status.name}</span>
      </div>
      <ul className='board'>
        {tasks.map((task) => (
          <DraggableTask key={task.scheduleId} task={task} />
        ))}
      </ul>
    </section>
  );
};

export default KanbanBoard;
