import React from "react";
import axios from "axios";
import "./TaskList.css";

function TaskList({ tasks, onTaskDeleted, onEdit }) {
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
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

  console.log("TaskList rendering with tasks:", tasks);

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
            <button onClick={() => onEdit(t)}>✏️</button>
            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;