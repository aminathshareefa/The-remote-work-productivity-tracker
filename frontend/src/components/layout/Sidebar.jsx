import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Clear session and redirect
    const handleLogout = () => {
        localStorage.removeItem('token'); // Deletes the auth token
        localStorage.removeItem('user');  // Deletes user data
        navigate('/login');               // Sends user back to login
    };

    const menuItems = [
        { name: 'Dashboard', path: '/employee' },
        { name: 'Tasks', path: '/employee/tasks' },
        { name: 'Time Tracker', path: '/employee/timer' },
        { name: 'Reports', path: '/employee/reports' },
    ];

    return (
        <div className="w-64 bg-blue-700 min-h-screen text-white flex flex-col p-4">
            <h2 className="text-xl font-bold mb-8 px-2">Remote Tracker</h2>
            
            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`block p-3 rounded-lg transition ${
                            location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-blue-600'
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Logout Button at the bottom */}
            <button 
                onClick={handleLogout}
                className="mt-auto w-full bg-red-500 p-3 rounded-lg font-bold hover:bg-red-600 transition duration-200"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;