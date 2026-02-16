import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Standard Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboards
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";

// Essential Components
import ProtectedRoute from "./components/ProtectedRoute"; // IMPORTED ONLY ONCE
import Layout from "./components/layout/Layout";
import TaskBoard from "./components/employee/TaskBoard";
import TimeTracker from "./components/employee/TimeTracker";
import Reports from "./components/employee/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Employee Portal - Wrapped in Layout to fix blank screen */}
        <Route path="/employee" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="timer" element={<TimeTracker />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Management */}
        <Route path="/manager" element={<ProtectedRoute roleRequired="Manager"><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roleRequired="Admin"><AdminDashboard /></ProtectedRoute>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;