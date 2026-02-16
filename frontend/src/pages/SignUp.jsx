import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Employee" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert("Registration Successful! Please Login.");
            navigate('/login');
        } catch (err) { alert("Registration failed. Email might already exist."); }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' }}>
            <form onSubmit={handleSubmit} style={{ background: 'white', padding: '40px', borderRadius: '10px', width: '350px' }}>
                <h2 style={{ textAlign: 'center' }}>Create Account</h2>
                <input type="text" placeholder="Full Name" required style={inputStyle} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Email" required style={inputStyle} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" required style={inputStyle} onChange={e => setFormData({...formData, password: e.target.value})} />
                <select style={inputStyle} onChange={e => setFormData({...formData, role: e.target.value})}>
                    <option value="Employee">Employee</option>
                    <option value="Manager">Manager</option>
                </select>
                <button type="submit" style={btnStyle}>Sign Up</button>
                <p style={{ marginTop: '15px' }}>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

const inputStyle = { display: 'block', width: '100%', margin: '10px 0', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const btnStyle = { width: '100%', background: '#2563eb', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' };

export default SignUp;