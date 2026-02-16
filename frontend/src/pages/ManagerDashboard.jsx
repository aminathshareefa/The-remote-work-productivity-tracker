import React, { useState, useEffect } from 'react';
import API from '../services/api';

const ManagerDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [newTask, setNewTask] = useState({ 
        title: '', 
        description: '', 
        assignedTo: '', 
        priority: 'Medium' 
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch tasks and users simultaneously
                const [taskRes, userRes] = await Promise.all([
                    API.get('/manager/team-progress'),
                    API.get('/admin/users') 
                ]);
                
                setTasks(taskRes.data);

                // Filter for users who are Employees AND have been approved by Admin
                const approvedEmployees = userRes.data.filter(
                    u => u.role === 'Employee' && u.isApproved === true
                );
                setEmployees(approvedEmployees);
                
            } catch (err) {
                console.error("Data fetch failed", err);
            }
        };
        fetchData();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.assignedTo) {
            return alert("Please select an approved employee!");
        }

        try {
            // Sends the task to the backend createTask controller
            const res = await API.post('/tasks/assign', newTask);
            setTasks([...tasks, res.data]);
            setNewTask({ title: '', description: '', assignedTo: '', priority: 'Medium' });
            alert("Task successfully assigned!");
        } catch (err) {
            console.error(err);
            alert("Error assigning task. Ensure backend is running.");
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manager Overview</h1>

            {/* Task Assignment Form */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-8 border-t-4 border-blue-600">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Assign New Task</h2>
                <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                        type="text" 
                        placeholder="Task Title" 
                        required
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    
                    {/* Dynamic Employee Selection based on SRS approval rules */}
                    <select 
                        required 
                        className="border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newTask.assignedTo}
                        onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                    >
                        <option value="">Select Approved Employee...</option>
                        {employees.map(emp => (
                            <option key={emp._id} value={emp._id}>
                                {emp.name} ({emp.email})
                            </option>
                        ))}
                    </select>

                    <textarea 
                        placeholder="Task Description" 
                        className="border p-2 rounded md:col-span-2 outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                    
                    <select 
                        className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>

                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition shadow-sm"
                    >
                        Assign Task
                    </button>
                </form>
            </div>

            {/* Team Progress View */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Task Title</th>
                            <th className="p-4 font-semibold text-gray-600">Assigned To</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? tasks.map(task => (
                            <tr key={task._id} className="border-b hover:bg-gray-50 transition">
                                <td className="p-4 text-gray-800">{task.title}</td>
                                <td className="p-4 text-gray-600 font-medium">{task.assignedTo?.name || 'Unassigned'}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        task.status === 'Completed' 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {task.status || 'Pending'}
                                    </span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-gray-400 italic">
                                    No tasks have been assigned yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerDashboard;