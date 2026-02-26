import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Employee" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await API.post('/auth/register', formData);
            alert("Registration successful! You can now log in.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try a different email.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
                
                {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg outline-none" 
                        onChange={e => setFormData({...formData, name: e.target.value})} required />
                    
                    <input type="email" placeholder="Email" className="w-full p-3 border rounded-lg outline-none" 
                        onChange={e => setFormData({...formData, email: e.target.value})} required />
                    
                    <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg outline-none" 
                        onChange={e => setFormData({...formData, password: e.target.value})} required />
                    
                    <select className="w-full p-3 border rounded-lg bg-white outline-none" 
                        onChange={e => setFormData({...formData, role: e.target.value})}>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                    </select>

                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">
                        Sign Up
                    </button>
                </form>
                
                <p className="text-center mt-6 text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;