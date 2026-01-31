'use client';
import React, { useState, ChangeEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Accordion from '../components/accordion';
import Dropdown from '../components/dropdown';
import { Option, Task } from '../components/interfaces';
import { v4 as uuidv4 } from 'uuid';
import Header from '../components/header';
import { useSession } from 'next-auth/react';

const TaskScreen: React.FC = () => {
  const { data: session } = useSession();
  const initialTasks: Task[] = new Array(3).fill(null).map(() => ({
    name: '',
    time: '30',
    priority: 'Low',
    concentration: 'Low',
    isCompleted: false,
    isScheduled: false,
    start_time: '',
    end_time: '',
    id: uuidv4(),
  }));


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

  const handleSetTask = useCallback(() => {
    if (tasks) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sub: session?.sub,
                tasks: tasks,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Tasks updated:', data);
            router.push('/concentrationselector')

        })
        .catch((error) => {
            console.error('Error updating tasks:', error);
        });
    }
}, [session?.sub, tasks, router])

  return (
    <div className="w-full flex flex-col ">
      <Header progressBarNumber={2} />
      <h1 className='text-heading-2 mb-[16px] ml-[16px] mr-[16px]'>What would you like to get done?</h1>
      <p className="text-subhead-1 mb-[32px] ml-[16px] mr-[16px]">List up to 3 tasks you want to complete. Use the concentration level to notate which tasks require more brain power. This will help us match those tasks to your peak productivity time.</p>
      {tasks.map((task, index) => (
        <Accordion key={task.id} title={`Task ${index + 1}`}>
          <div className="mb-4 ml-4 mr-4">
            <label htmlFor={`taskName${index}`} className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
              What task do you want to do?
            </label>
            <input
              type="text"
              id={`taskName${index}`}
              value={task.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleTaskInputChange(index, 'name', e.target.value)}
              placeholder="e.g., Go for a walk"
              className="w-full  border-2 border-blackish bg-whiteish rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-between gap-16 mb-4 ml-4 mr-4">
            <div className="flex-1">
              <label htmlFor={`taskTime${index}`} className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
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
              <label htmlFor={`taskPriority${index}`} className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
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
          <div className='ml-4 mr-4'>
            <label htmlFor={`taskConcentration${index}`} className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
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
