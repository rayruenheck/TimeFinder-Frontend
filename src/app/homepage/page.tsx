"use client"
import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import GoogleCalendar from '../components/googlecalendar';
import TaskCard from '../components/taskcard';
import { Task } from '../components/interfaces';
import Header from '../components/header';
import { v4 as uuidv4 } from 'uuid';

export default function Page() {
    const { data: session } = useSession();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Task>({
        name: '',
        time: '',
        priority: '',
        concentration: '',
        isCompleted: false,
        isScheduled: false,
        start_time: '',
        end_time: '',
        id: uuidv4()
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const formatDate = () => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        const today = new Date();
        return today.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        if (session?.sub) {
            fetch(`http://127.0.0.1:5000/get-tasks?sub=${session.sub}`)
                .then(response => response.json())
                .then(data => {
                    setTasks(data.tasks);
                })
                .catch(error => console.error("Failed to load tasks", error));
        }
    }, [session?.sub]);

    const handleTaskInputChange = (field: keyof Task, value: string) => {
        setNewTask({ ...newTask, [field]: value });
    };

    const handleAddTask = () => {
        if (session?.sub) {
            fetch('http://127.0.0.1:5000/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ task: newTask, sub: session.sub })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                setIsPopupOpen(false);
                setNewTask({
                    name: '',
                    time: '',
                    priority: '',
                    concentration: '',
                    isCompleted: false,
                    isScheduled: false,
                    start_time: '',
                    end_time: '',
                    id: uuidv4()
                });
                // Optionally, refetch tasks or update the state to include the new task
                setTasks(prevTasks => [...prevTasks, newTask]);
            })
            .catch(error => console.error("Failed to add task", error));
        }
    };

    const scheduledTasks = tasks?.filter(task => task.isScheduled);
    const unscheduledTasks = tasks?.filter(task => !task.isScheduled);
    const completedTasks = tasks?.filter(task => task.isCompleted);

    return (
        <div>
            <Header progressBarNumber={0} />
            <div>
                <h2 className="text-heading-2 m-4">{formatDate()}</h2>
                <GoogleCalendar/>
                <a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer">link to google calendar</a>
                <h2 className="text-heading-2 m-4 mt-[40px]">Today&apos;s Scheduled Tasks</h2>
                <p className="text-subhead-1 m-4">Here are your auto-scheduled tasks for today. Feel free to mark them as complete any time during the day. Any task you don&apost complete will return to the Task List at the end of the day.</p>
                {scheduledTasks?.map(task => (
                    <TaskCard key={task.id} task={task} />  // Render TaskCard for each scheduled task
                ))}
            </div>
            <div className="custom-div flex flex-col items-center gap-[10px]">
                <p className='completed-this-week-number' >{completedTasks?.length}</p>
                <p className='completed-this-week'>Task&apos;s completed this week</p>
                <div className='flex'>
                    <p className='completed-all-time'>Task&apos;s completed all time:</p>
                    <p className='completed-all-time-number ml-4'>{completedTasks?.length}</p>
                </div>
            </div>
            <div className="custom-div-2 flex flex-col items-center ">
                <p className='text-heading-5 ml-4 mb-4'>unscheduled task&apos;s</p>
                <p className='text-subhead-3 ml-4 mb-[40px]'>Add new tasks and TimeFinder will prioritize and schedule up to 5 tasks tomorrow. Remember, not all tasks need to be productive! We encourage you to add tasks that help you rest and reset too.</p>
                <button className='button-1 w-[172px] h-[32px] mb-[32px]' onClick={() => setIsPopupOpen(true)}>add task</button>
                <div className='w-full flex items-start justify-start flex-col'>{unscheduledTasks?.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
                </div>
            </div>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h3 className='text-heading-5'>Add Task</h3>
                        <div className="mb-4 ml-4 mr-4">
                            <label htmlFor="taskName" className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
                                What task do you want to do?
                            </label>
                            <input
                                type="text"
                                id="taskName"
                                value={newTask.name}
                                onChange={(e) => handleTaskInputChange('name', e.target.value)}
                                placeholder="e.g., Go for a walk"
                                className="w-full border-2 border-blackish bg-whiteish rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex justify-between gap-16 mb-4 ml-4 mr-4">
                            <div className="flex-1">
                                <label htmlFor="taskTime" className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
                                    Duration
                                </label>
                                <select
                                    id="taskTime"
                                    value={newTask.time}
                                    onChange={(e) => handleTaskInputChange('time', e.target.value)}
                                    className="w-full border-2 border-blackish bg-whiteish rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                >
                                    {times.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="taskPriority" className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
                                    Priority
                                </label>
                                <select
                                    id="taskPriority"
                                    value={newTask.priority}
                                    onChange={(e) => handleTaskInputChange('priority', e.target.value)}
                                    className="w-full border-2 border-blackish bg-whiteish rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                >
                                    {priorities.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='ml-4 mr-4'>
                            <label htmlFor="taskConcentration" className="mb-2 block truncate uppercase text-blackish font-gabarito text-sm font-semibold leading-normal">
                                Concentration required
                            </label>
                            <select
                                id="taskConcentration"
                                value={newTask.concentration}
                                onChange={(e) => handleTaskInputChange('concentration', e.target.value)}
                                className="w-full border-2 border-blackish bg-whiteish rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            >
                                {concentrations.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button className="button-1 w-[100px] h-[32px]" onClick={handleAddTask}>Add Task</button>
                            <button className="button-1 w-[100px] h-[32px] ml-2" onClick={() => setIsPopupOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const times = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' },
];

const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
];

const concentrations = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
];