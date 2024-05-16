import React, { useState } from 'react';
import { Task } from './interfaces';


type TaskCardProps = {
    task: Task;  // Define the type for props, indicating it expects an object with a 'task' property
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const [completed, setCompleted] = useState(task.isCompleted);

    const handleCheckboxChange = (id: string, isCompleted: boolean) => {
        const newCompletedStatus = !isCompleted;
        fetch('https://timefinder-backend-2.onrender.com/update-completion', {
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

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format and handle midnight
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero to minutes if needed
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    return (
        <div className="p-4  w-[380]">
            <div className="flex justify-center items-center">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleCheckboxChange(task.id, completed)}
                    className={`custom-checkbox  ${
                        completed ? 'checked' : ''
                    }`}
                />
                <div className="flex-grow">
                    <span className={`${completed ? 'line-through-black' : ''} button-3 ml-4 ${task.isScheduled ? "" : "text-black"}`}>
                        {task.name}
                    </span>
                    {task.isScheduled ? 
                    <div className="button-4 flex ml-4">
                        <p>Priority: {task.priority}</p>
                        <p className="ml-[16px]">Concentration: {task.concentration}</p>
                    </div> : '' }
                </div>
                {task.start_time ? (
                    <span className="time-pill">
                        {formatTime(task.start_time)}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default TaskCard;

