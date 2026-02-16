import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const Reports = () => {
    const [logs, setLogs] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await API.get(`/time/logs/${user.id}`);
                setLogs(res.data);
            } catch (err) {
                console.error("Error fetching logs", err);
            }
        };
        fetchLogs();
    }, [user.id]);

    const totalSeconds = logs.reduce((acc, log) => acc + log.duration, 0);
    const totalHours = (totalSeconds / 3600).toFixed(2);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Weekly Productivity Report</h2>
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-600 mb-8">
                <p className="text-gray-500 font-medium">Total Time Logged This Week</p>
                <h3 className="text-4xl font-bold text-blue-700">{totalHours} <span className="text-lg">Hours</span></h3>
            </div>

            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Date</th>
                            <th className="p-4 font-semibold text-gray-600">Duration (Min)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.slice(0, 5).map(log => (
                            <tr key={log._id} className="border-b hover:bg-gray-50">
                                <td className="p-4 text-sm">{new Date(log.startTime).toLocaleDateString()}</td>
                                <td className="p-4 text-sm font-medium">{(log.duration / 60).toFixed(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;