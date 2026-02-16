import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div style={{ background: 'white', padding: '15px 30px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#333' }}>Remote Work Tracker</span>
            <button onClick={handleLogout} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
        </div>
    );
};

export default Topbar;