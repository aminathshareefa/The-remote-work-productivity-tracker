import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setError("");
      fetchTasks();
    } catch (err) {
      setError("Failed to create task");
    }
  };

  // Mark completed
  const markCompleted = async (id) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tasks/${id}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 📊 Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* 📊 Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Total Tasks</h3>
          <p className="text-2xl font-bold">{totalTasks}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-2xl font-bold">{completedTasks}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl font-bold">{pendingTasks}</p>
        </div>
      </div>

      {/* Create Task */}
      <form onSubmit={createTask} className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-2"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </form>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded p-4 bg-white shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p
                  className={`text-sm ${
                    task.status === "Completed"
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {task.status}
                </p>
              </div>

              <div className="flex gap-2">
                {task.status !== "Completed" && (
                  <button
                    onClick={() => markCompleted(task._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}