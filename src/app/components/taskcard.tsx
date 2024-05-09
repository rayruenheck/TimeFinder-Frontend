import React, { useState } from 'react';
import { Task } from './interfaces';

type TaskCardProps = {
    task: Task;  // Define the type for props, indicating it expects an object with a 'task' property
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const [completed, setCompleted] = useState(task.isCompleted);

    const handleCheckboxChange = (id: string, isCompleted: boolean) => {
        const newCompletedStatus = !isCompleted;
        fetch('http://localhost:5000/update-completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, isCompleted: newCompletedStatus })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log('Update successful:', data.message);
                setCompleted(newCompletedStatus);
            } else {
                console.error('Failed to update task:', data.message);
            }
        })
        .catch(error => {
            console.error('Failed to update task:', error);
        });
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 m-4 w-64 shadow-sm">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleCheckboxChange(task.id, completed)}
                    className="form-checkbox h-5 w-5 text-blue-600 mr-2"
                />
                <span className={`${completed ? 'line-through' : ''} flex-grow`}>{task.name}</span>
            </div>
            <div className="text-sm text-gray-700 mt-2">
                <p>Priority: {task.priority}</p>
                <p>Concentration: {task.concentration}</p>
            </div>
        </div>
    );
};

export default TaskCard;
