import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* The Sidebar remains fixed on the left for all logged-in users */}
            <Sidebar />
            
            {/* The Main Content area changes based on the route */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;