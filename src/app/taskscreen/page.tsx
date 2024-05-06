'use client'
import React, { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dropdown from '../components/dropdown'; 
import { Option, Task } from '../components/interfaces';



const TaskScreen: React.FC = () => {
  
  const [tasks, setTasks] = useState<Task[]>([
    { name: '', time: '', priority: '', concentration: '' },
    { name: '', time: '', priority: '', concentration: '' },
    { name: '', time: '', priority: '', concentration: '' }
  ]);
  const router = useRouter();

  const times: Option<string>[] = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  
  const handleTaskInputChange = (index: number, field: keyof Task, value: string): void => {
    setTasks(tasks.map((task, i) => (i === index ? { ...task, [field]: value } : task)));
  };
  
  const areAllTasksComplete = () => {
    return tasks.every(task => task.name && task.time && task.priority && task.concentration);
  }

  const handleSetTask = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    router.push("/googleconnect")
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Time Finder</h1>
      <p className="text-lg text-gray-600 mb-4">Please create 3 tasks and see how quick it is with TimeFinder.</p> 
      {tasks.map((task, index) => (
        <div key={index} className="mt-6 p-4 border rounded-lg">
          <h2 className="text-2xl mb-4 text-center">Task {index + 1}</h2>
          <div className="mb-4 text-center">
            <label htmlFor={`taskName${index}`} className="block text-lg text-center">Task Name:</label>
            <input
              type="text"
              id={`taskName${index}`}
              value={task.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleTaskInputChange(index, 'name', e.target.value)}
              placeholder="e.g. walk the dog"
              className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`taskTime${index}`} className="block text-lg text-center">Task Time:</label>
            <Dropdown
              id={`taskTime${index}`}
              options={times}
              value={task.time}
              onChange={(value) => handleTaskInputChange(index, 'time', value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor={`taskPriority${index}`} className="block text-lg text-center">Task Priority:</label>
            <Dropdown
              id={`taskPriority${index}`}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
              ]}
              value={task.priority}
              onChange={(value) => handleTaskInputChange(index, 'priority', value)}
            />
          </div>
          <div>
            <label htmlFor={`taskConcentration${index}`} className="block text-lg text-center">Task Concentration:</label>
            <Dropdown
              id={`taskConcentration${index}`}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
              ]}
              value={task.concentration}
              onChange={(value) => handleTaskInputChange(index, 'concentration', value)}
            />
          </div>
        </div>
      ))}
       <button onClick={handleSetTask} disabled={!areAllTasksComplete()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block mx-auto">Next</button>
    </div>
  );
};

export default TaskScreen;