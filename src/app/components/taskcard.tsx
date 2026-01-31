import React, { useState } from 'react';
import { Task } from './interfaces';

type TaskCardProps = {
    task: Task;
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const [completed, setCompleted] = useState(task.isCompleted);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleCheckboxChange = (id: string, isCompleted: boolean) => {
        const newCompletedStatus = !isCompleted;
        setIsUpdating(true);

        fetch('http://127.0.0.1:5000/update-completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, isCompleted: newCompletedStatus })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                setCompleted(newCompletedStatus);
            } else {
                console.error('Failed to update task:', data.message);
            }
        })
        .catch(error => {
            console.error('Failed to update task:', error);
        })
        .finally(() => {
            setIsUpdating(false);
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
        <div className="p-4 w-full task-card animate-scale-in">
            <div className={`flex justify-between items-center transition-opacity ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex items-center flex-grow">
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => handleCheckboxChange(task.id, completed)}
                        disabled={isUpdating}
                        className={`custom-checkbox transition-all ${completed ? 'checked' : ''}`}
                        aria-label={`Mark ${task.name} as ${completed ? 'incomplete' : 'complete'}`}
                    />
                    <div className="flex-grow ml-4">
                        <span className={`${completed ? 'line-through-black opacity-60' : ''} button-3 transition-all ${task.isScheduled ? "" : "text-black"}`}>
                            {task.name}
                        </span>
                        {task.isScheduled && (
                            <div className="button-4 flex gap-4 mt-1">
                                <span className="inline-flex items-center">
                                    <span className="font-semibold">Priority:</span> {task.priority}
                                </span>
                                <span className="inline-flex items-center">
                                    <span className="font-semibold">Concentration:</span> {task.concentration}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                {task.start_time && (
                    <span className="time-pill whitespace-nowrap ml-4 transition-all hover-lift">
                        {formatTime(task.start_time)}
                    </span>
                )}
            </div>
        </div>
    );
};

export default TaskCard;

