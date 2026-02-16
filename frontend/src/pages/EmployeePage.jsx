import React from 'react';
import { Outlet } from 'react-router-dom';

const EmployeePage = () => {
    return (
        <div style={{ padding: '20px' }}>
            {/* The Outlet renders the nested routes like Dashboard, Tasks, etc. */}
            <Outlet />
        </div>
    );
};

export default EmployeePage;