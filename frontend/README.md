Remote Work Productivity Tracker

A full-stack MERN application designed to help managers assign tasks to employees and track team progress in real-time.


🚀 Recent Bug Fixes

Auth Fix: Resolved a double-hashing conflict in authController.js to ensure login works perfectly.

Route Fix: Corrected the /api/employees/list 404 error by properly mounting routes in server.js.

Dashboard Fix: Fixed the 500 error on the Manager Dashboard and updated filtering logic to display approved employees correctly.


🛠️ Tech Stack

Frontend: React.js, Tailwind CSS, Axios

Backend: Node.js, Express.js

Database: MongoDB Atlas

Authentication: JSON Web Tokens (JWT) & Bcrypt.js


📋 Features

Role-based Access: Separate dashboards for Managers and Employees.

Task Assignment: Managers can assign tasks to specific approved employees.

Real-time Status: Track task completion status from 'Pending' to 'Completed'.

Secure Login: Encrypted passwords and protected API routes.