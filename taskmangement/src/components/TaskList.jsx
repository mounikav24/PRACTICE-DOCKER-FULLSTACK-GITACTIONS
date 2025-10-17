import React from "react";
import axios from "axios";
import "./TaskList.css";

function TaskList({ tasks, onTaskDeleted, onEdit }) {
  const deleteTask = async (id) => {
    console.log("=== DELETE BUTTON CLICKED ===");
    console.log("Task ID to delete:", id);
    
    if (!window.confirm("Are you sure you want to delete this task?")) {
      console.log("Delete cancelled by user");
      return;
    }
    
    try {
      console.log("Attempting to delete task:", id);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
      console.log("Delete response:", response.status);
      console.log("Calling onTaskDeleted callback");
      onTaskDeleted(id);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  console.log("TaskList component rendered");
  console.log("Number of tasks:", tasks.length);
  console.log("onTaskDeleted callback:", typeof onTaskDeleted);

  return (
    <div className="task-list">
      <h2>📚LIST OF TASKS</h2>
      <ul>
        {tasks.map((t, idx) => (
          <li key={t.id}>
            <span>
              <strong>{idx + 1}.</strong>{" "}
              <strong>
                {t.startDate} - {t.endDate}
              </strong>{" "}
              | {t.title} : {t.description} | Priority: {t.priority} | Status:{" "}
              {t.status}
            </span>
            <button onClick={() => {
              console.log("Edit button clicked for task:", t.id);
              onEdit(t);
            }}>✏️</button>
            <button onClick={() => {
              console.log("Delete button clicked for task:", t.id);
              deleteTask(t.id);
            }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;