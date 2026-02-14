// src/components/TaskCard.js
import React from "react";
export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <span
        className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
          task.status === "Completed"
            ? "bg-green-100 text-green-700"
            : task.status === "In Progress"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {task.status}
      </span>
    </div>
  );
}