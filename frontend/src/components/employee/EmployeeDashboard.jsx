import React, { useState, useEffect } from 'react';
import API from '../../services/api'; // Ensure this path is correct

const EmployeeDashboard = () => {
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // This calls your taskController.js in the backend
                const res = await API.get(`/tasks/employee/${user.id}`);
                const tasks = res.data;
                
                setStats({
                    total: tasks.length,
                    completed: tasks.filter(t => t.status === 'Completed').length,
                    pending: tasks.filter(t => t.status !== 'Completed').length
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            }
        };

        if (user?.id) fetchDashboardData();
    }, [user?.id]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase">Total Tasks</h3>
                    <p className="text-3xl font-bold mt-2">{stats.total}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-green-500 uppercase">Completed</h3>
                    <p className="text-3xl font-bold mt-2 text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-orange-500 uppercase">Pending</h3>
                    <p className="text-3xl font-bold mt-2 text-orange-600">{stats.pending}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;