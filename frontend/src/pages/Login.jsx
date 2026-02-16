import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            const res = await API.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            // Redirect based on role defined in your SRS
            if (res.data.user.role === 'Admin') navigate('/admin');
            else if (res.data.user.role === 'Manager') navigate('/manager');
            else navigate('/employee');
            
            window.location.reload(); 
        } catch (err) {
            setError(err.response?.data?.message || "Login Failed! Check your credentials or Backend connection.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login to Tracker</h2>
                
                {error && <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" placeholder="myuser@gmail.com" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" placeholder="••••••" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                        onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">Login</button>
                </form>
                
                <p className="text-center mt-6 text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;