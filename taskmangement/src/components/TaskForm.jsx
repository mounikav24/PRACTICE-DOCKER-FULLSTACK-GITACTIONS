import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskForm.css";

function TaskForm({ onTaskAdded, editTask, onTaskUpdated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (editTask) {
      setForm(editTask);
    } else {
      setForm({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        priority: "",
        status: "",
      });
    }
  }, [editTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    axios.post(`${import.meta.env.VITE_API_URL}/tasks`, form)
      .then(res => {
        onTaskAdded(res.data);
        setForm({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          priority: "",
          status: "",
        });
      });
  };

  const updateTask = () => {
    axios.put(`${import.meta.env.VITE_API_URL}/tasks/${form.id}`, form)
      .then(res => {
        onTaskUpdated(res.data);
        setForm({
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          priority: "",
          status: "",
        });
      });
  };

  return (
    <div className="task-form">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        placeholder="Start Date"
        type="date"
      />
      <input
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        placeholder="End Date"
        type="date"
      />
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="">Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="">Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={editTask ? updateTask : addTask}>
        {editTask ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TaskForm;