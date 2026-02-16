import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await API.get(`/tasks/employee/${user.id}`);
                setTasks(res.data);
            } catch (err) {
                console.error("Fetch failed", err);
            }
        };
        fetchTasks();
    }, [user.id]);

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await API.patch(`/tasks/${taskId}`, { status: newStatus });
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
        } catch (err) {
            alert("Could not update task");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Task Management</h2>
            <div className="grid gap-4">
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm border flex justify-between items-center">
                        <div>
                            <h4 className="font-bold text-gray-800">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.description}</p>
                        </div>
                        <select 
                            value={task.status} 
                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                            className="bg-gray-50 border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="To-Do">To-Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                )) : <p className="text-gray-400 italic">No tasks assigned yet.</p>}
            </div>
        </div>
    );
};

export default TaskBoard;