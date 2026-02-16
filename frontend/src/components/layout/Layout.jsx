import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                {/* This renders the specific page content */}
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;