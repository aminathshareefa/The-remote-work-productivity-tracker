import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import TaskBoard from './components/employee/TaskBoard';
import TimeTracker from './components/employee/TimeTracker';
import Reports from './components/employee/Reports';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute roleRequired="Admin">
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route index element={<AdminDashboard />} />
                </Route>

                {/* Manager Routes - Now wrapped in Layout to show Sidebar/Logout */}
                <Route path="/manager" element={
                    <ProtectedRoute roleRequired="Manager">
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route index element={<ManagerDashboard />} />
                </Route>

                {/* Employee Routes */}
                <Route path="/employee" element={
                    <ProtectedRoute roleRequired="Employee">
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route index element={<TaskBoard />} />
                    <Route path="tasks" element={<TaskBoard />} />
                    <Route path="timer" element={<TimeTracker />} />
                    <Route path="reports" element={<Reports />} />
                </Route>

                {/* Catch-all Redirect */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;