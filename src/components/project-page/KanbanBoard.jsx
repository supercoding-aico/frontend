import '@styles/components/project-page/kanban-board.scss';

const KanbanBoard = ({ status, tasks }) => {
  return (
    <section className='board-wrapper'>
      <div>
        <span>{status.emoji}</span>
        <span>{status.name}</span>
      </div>
      <ul className='board'>
        {tasks.map((task) => (
          <li key={task.scheduleId} className='board__task'>
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
        ))}
      </ul>
    </section>
  );
};

export default KanbanBoard;
