import { useState } from 'react';

const AddTask = () => {
  const [taskName, setTaskName] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState('');
  const [concentration, setConcentration] = useState('');

  const handleSave = () => {
    // Here you can handle saving the task to the database
    const taskData = {
      name: taskName,
      time,
      priority,
      concentration,
    };
    console.log('Task data:', taskData);
    // Reset form fields after saving
    setTaskName('');
    setTime('');
    setPriority('');
    setConcentration('');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Task</h2>
      <div className="mb-4">
        <label htmlFor="taskName" className="block text-lg">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="e.g. walk the dog"
          className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="time" className="block text-lg">Time:</label>
        <input
          type="number"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="30"
          className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="priority" className="block text-lg">Priority:</label>
        <input
          type="number"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          placeholder="3"
          className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="concentration" className="block text-lg">Concentration:</label>
        <input
          type="number"
          id="concentration"
          value={concentration}
          onChange={(e) => setConcentration(e.target.value)}
          placeholder="3"
          className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Save
      </button>
    </div>
  );
};

export default AddTask;
