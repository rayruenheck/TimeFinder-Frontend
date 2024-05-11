import { useState } from 'react';

interface Task {
  id: number;
  name: string;
  time: string;
  priority: string;
  concentration: string;
  completed: boolean;
}

interface Props {
  onUpdateTaskCounters: (completed: boolean) => void;
}

const TodayTask: React.FC<Props> = ({ onUpdateTaskCounters }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', time: '9:00 AM', priority: 'High', concentration: 'Medium', completed: false },
    { id: 2, name: 'Task 2', time: '11:00 AM', priority: 'Medium', concentration: 'High', completed: false },
    { id: 3, name: 'Task 3', time: '1:00 PM', priority: 'Low', concentration: 'Low', completed: false },
  ]);

  const handleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };
          onUpdateTaskCounters(updatedTask.completed); // Update task counters in the parent component
          return updatedTask;
        }
        return task;
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Today&aposs Tasks</h2>
      <p className="text-lg text-gray-600 mb-4">
        Here are your auto-scheduled tasks for today. Feel free to mark them as complete any time during the day. Any
        task you don&apost complete will return to the Task List at the end of the day.
      </p>
      {tasks.map((task) => (
        <div key={task.id} className="mb-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleTaskCompletion(task.id)}
              className="mr-2"
            />
            <div>
              <p className={`text-lg ${task.completed ? 'line-through' : ''}`}>{task.name}</p>
              <p className="text-sm text-gray-500">
                {task.time} | Priority: {task.priority} | Concentration: {task.concentration}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodayTask;


