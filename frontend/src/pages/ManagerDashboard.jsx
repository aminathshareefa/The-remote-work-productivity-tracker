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
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [taskRes, userRes] = await Promise.all([
                API.get('/manager/team-progress'),
                API.get('/admin/users') 
            ]);
            
            setTasks(taskRes.data);

            const approvedEmployees = userRes.data.filter(
                u => u.role === 'Employee' && u.isApproved === true
            );
            setEmployees(approvedEmployees);
            setLoading(false);
        } catch (err) {
            console.error("Data fetch failed", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.assignedTo) return alert("Please select an employee!");

        try {
            await API.post('/tasks/assign', newTask);
            setNewTask({ title: '', description: '', assignedTo: '', priority: 'Medium' });
            fetchData(); 
            alert("Task assigned successfully!");
        } catch (err) {
            alert("Error assigning task.");
        }
    };

    if (loading) return <div className="p-10 text-center text-xl font-bold">Loading Team Data...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen w-full">
            {/* Header with Navigation Link feel */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">Manager Control Center</h1>
                <nav className="text-blue-600 font-semibold">Team Progress Overview</nav>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Task Assignment Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600 h-fit">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Assign New Task</h2>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-gray-600">Task Title</label>
                            <input 
                                type="text" required className="w-full border p-2 rounded mt-1"
                                value={newTask.title}
                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                placeholder="e.g. Frontend Debugging"
                            />
                        </div>
                        
                        <div>
                            <label className="text-sm font-bold text-gray-600">Assign To (Approved Employees)</label>
                            <select 
                                required className="w-full border p-2 rounded mt-1"
                                value={newTask.assignedTo}
                                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">Priority</label>
                            <select 
                                className="w-full border p-2 rounded mt-1"
                                value={newTask.priority}
                                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600">Description</label>
                            <textarea 
                                className="w-full border p-2 rounded mt-1 h-24"
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />
                        </div>

                        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
                            Assign Task
                        </button>
                    </form>
                </div>

                {/* Team Progress Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border">
                    <div className="bg-gray-100 p-4 font-bold text-gray-700 border-b">Current Team Tasks</div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 text-gray-600">Task</th>
                                <th className="p-4 text-gray-600">Assigned To</th>
                                <th className="p-4 text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length > 0 ? tasks.map(task => (
                                <tr key={task._id} className="border-b hover:bg-gray-50">
                                    <td className="p-4 font-medium">{task.title}</td>
                                    <td className="p-4 text-blue-700">
                                        {task.assignedTo?.name || "Unassigned"}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            task.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {task.status || 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="p-10 text-center text-gray-400">No tasks found. Assign some above!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;