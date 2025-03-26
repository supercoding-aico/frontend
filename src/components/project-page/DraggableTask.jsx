import { useDrag } from 'react-dnd';

const DraggableTask = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.scheduleId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <li
      key={task.scheduleId}
      ref={drag}
      className={`board__task ${isDragging ? 'board__task--dragging' : ''}`}
    >
      <p className='board__task--content'>{task.content}</p>
      <p className='board__task--date'>
        {task.startDate} ~ {task.endDate}
      </p>
      <div className='board__task--users'>
        {task.users.map((user) => (
          <span className='board__task--user' key={user.userId}>
            {user.nickName}
          </span>
        ))}
      </div>
    </li>
  );
};

export default DraggableTask;
