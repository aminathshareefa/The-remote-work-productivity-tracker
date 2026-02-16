import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get('/admin/users');
                setUsers(res.data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const handleApproval = async (userId) => {
        try {
            await API.put(`/admin/approve/${userId}`);
            // Refresh the list to show updated status
            setUsers(users.map(u => u._id === userId ? { ...u, isApproved: !u.isApproved } : u));
        } catch (err) {
            alert("Approval failed. Check backend routes.");
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">User Approval Management</h1>
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.role}</td>
                                <td className="p-4">
                                    {user.isApproved ? 
                                        <span className="text-green-600 font-bold">Approved</span> : 
                                        <span className="text-red-500 font-bold">Pending</span>
                                    }
                                </td>
                                <td className="p-4">
                                    <button 
                                        onClick={() => handleApproval(user._id)}
                                        className={`px-4 py-2 rounded text-white ${user.isApproved ? 'bg-orange-500' : 'bg-green-600'}`}
                                    >
                                        {user.isApproved ? 'Revoke' : 'Approve'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;