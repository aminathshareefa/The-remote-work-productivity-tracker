import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    

    const user = JSON.parse(localStorage.getItem('user')) || {};

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const getMenuItems = () => {
        if (user.role === 'Admin') {
            return [
                { name: 'User Management', path: '/admin' }
            ];
        } else if (user.role === 'Manager') {
            return [
                { name: 'Manager Overview', path: '/manager' }
            ];
        } else {
            // Employee links
            return [
                { name: 'Tasks', path: '/employee/tasks' },
                { name: 'Time Tracker', path: '/employee/timer' },
                { name: 'Reports', path: '/employee/reports' },
            ];
        }
    };

    const menuItems = getMenuItems();

    return (
        <div className="w-64 bg-blue-700 min-h-screen text-white flex flex-col p-4 shadow-xl">
            {/* Branding */}
            <h2 className="text-xl font-bold mb-8 px-2 border-b border-blue-500 pb-4">
                Remote Tracker
            </h2>
            
            {/* User Info Section */}
            <div className="mb-6 px-2 bg-blue-800 p-3 rounded-lg shadow-inner">
                <p className="text-xs text-blue-200 uppercase font-bold tracking-wider">Logged in as:</p>
                <p className="text-lg font-semibold truncate">{user.name || 'User'}</p>
                <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded-full uppercase">
                    {user.role}
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`block p-3 rounded-lg transition-all duration-200 ${
                            location.pathname === item.path 
                            ? 'bg-blue-600 shadow-md translate-x-1' 
                            : 'hover:bg-blue-600'
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <button 
                onClick={handleLogout}
                className="mt-auto w-full bg-red-500 p-3 rounded-lg font-bold hover:bg-red-600 transition shadow-lg active:scale-95"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;