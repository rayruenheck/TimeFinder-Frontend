'use client';
import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Accordion from '../components/accordion';
import Dropdown from '../components/dropdown';
import { Option, Task } from '../components/interfaces';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/header';

const TaskScreen: React.FC = () => {
  const initialTasks: Task[] = new Array(3).fill(null).map(() => ({
    name: '',
    time: '',
    priority: '',
    concentration: '',
    isCompleted: false,
    isScheduled: false,
    id: uuidv4(),
  }));

  const taskLabels: Option<string>[] = [
    { value: 'task1', label: 'Task 1' },
    { value: 'task2', label: 'Task 2' },
    { value: 'task3', label: 'Task 3' },
  ];

  const times: Option<string>[] = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
  ];

  const priorities: Option<string>[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const concentrations: Option<string>[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskInputChange = (index: number, field: keyof Task, value: string): void => {
    setTasks(
      tasks.map((task, i) => {
        if (i === index) {
          const id = task.id || uuidv4();
          return { ...task, [field]: value, id };
        }
        return task;
      })
    );
  };

  const areAllTasksComplete = () => {
    return tasks.every((task) => task.name && task.time && task.priority && task.concentration);
  };

  const handleSetTask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    router.push('/googleconnect');
  };

  return (
    <div className="container mx-auto p-4 max-w-[393px]">
      <Header progressBarNumber={2} />
      <h1 className='text-heading-2 mb-[16px]'>What would you like to get done?</h1>
      <p className="text-subhead-1 mb-[32px]">List up to 3 tasks you want to complete. Use the concentration level to notate which tasks require more brain power. This will help us match those tasks to your peak productivity time.</p>
      {tasks.map((task, index) => (
        <Accordion key={task.id} title={`Task ${index + 1}`}>
          <div className="mb-4 text-center">
            <label htmlFor={`taskName${index}`} className="ml-3 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
              What task do you want to do?
            </label>
            <input
              type="text"
              id={`taskName${index}`}
              value={task.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleTaskInputChange(index, 'name', e.target.value)}
              placeholder="e.g., Laundry"
              className="w-full max-w-[361px] border-t-2 border-b-2 border-blackish bg-whiteish rounded-lg px-4 py-2 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between gap-16 mb-4">
            <div className="flex-1">
              <label htmlFor={`taskTime${index}`} className="ml-3 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
                Duration
              </label>
              <Dropdown
                id={`taskTime${index}`}
                options={times}
                value={task.time}
                onChange={(value) => handleTaskInputChange(index, 'time', value)}
                placeholder="30 minutes"
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`taskPriority${index}`} className="ml-3 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
                Priority
              </label>
              <Dropdown
                id={`taskPriority${index}`}
                options={priorities}
                value={task.priority}
                onChange={(value) => handleTaskInputChange(index, 'priority', value)}
                placeholder="Low"
              />
            </div>
          </div>
          <div>
            <label htmlFor={`taskConcentration${index}`} className="ml-3 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
              Concentration required
            </label>
            <Dropdown
              id={`taskConcentration${index}`}
              options={concentrations}
              value={task.concentration}
              onChange={(value) => handleTaskInputChange(index, 'concentration', value)}
              placeholder="Low"
            />
          </div>
        </Accordion>
      ))}
      <button
        onClick={handleSetTask}
        disabled={!areAllTasksComplete()}
        className="button-1 mt-4 block mx-auto"
      >
        Next
      </button>
    </div>
  );
};

export default TaskScreen;
