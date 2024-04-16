import React, { useState } from 'react';
import { TaskFormProps, TaskCardProps } from '../components/interfaces';

const TaskForm: React.FC<TaskFormProps> = ({ taskId }) => {
  const [taskName, setTaskName] = useState('');

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  return (
    <div>
      <h3>Task {taskId}</h3>
      <input
        type="text"
        placeholder="Enter task name"
        value={taskName}
        onChange={handleTaskNameChange}
      />
      {/* Other form inputs */}
    </div>
  );
};



const TaskCard: React.FC<TaskCardProps> = ({ taskId, onClick }) => {
  return (
    <div onClick={() => onClick(taskId)}>
      <p>Task {taskId}</p>
    </div>
  );
};

const TasksScreen: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleTaskClick = (taskId: number) => {
    setSelectedTask(selectedTask === taskId ? null : taskId);
  };

  return (
    <div>
      <h2>First 3 Tasks</h2>
      <p>Read intro and description here.</p>
      <div>
        <TaskCard taskId={1} onClick={handleTaskClick} />
        <TaskCard taskId={2} onClick={handleTaskClick} />
        <TaskCard taskId={3} onClick={handleTaskClick} />
      </div>
      <button disabled>Next</button>
      {selectedTask && <TaskForm taskId={selectedTask} />}
    </div>
  );
};

export default TasksScreen;