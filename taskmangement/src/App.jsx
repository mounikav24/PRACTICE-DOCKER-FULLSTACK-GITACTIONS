import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Summary from "./components/Summary";
import Search from "./components/Search";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks => 
      prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
    setEditTask(null);
  };

  const handleTaskDeleted = (deletedId) => {
    console.log("Deleting task with ID:", deletedId);
    setTasks(prevTasks => {
      const updated = prevTasks.filter(t => t.id !== deletedId);
      console.log("Updated tasks:", updated);
      return updated;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter tasks based on search query
  const filteredTasks = searchQuery
    ? tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tasks;

  return (
    <Router>
      <div className="container">
        <h1 style={{ textAlign: "center", marginBottom: "28px", color: "#2b2ff1ff" }}>
          ⏰Task Manager⏰
        </h1>
        <nav style={{ marginBottom: "20px", textAlign: "center" }}>
          <Link to="/" style={{ marginRight: "15px" }}>
            <b>ADD TASKS</b>
          </Link>
          <Link to="/summary">
            <b>VIEW SUMMARY</b>
          </Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Search onSearch={handleSearch} />
                <TaskForm
                  onTaskAdded={handleTaskAdded}
                  editTask={editTask}
                  onTaskUpdated={handleTaskUpdated}
                />
                <TaskList
                  tasks={filteredTasks}
                  onTaskDeleted={handleTaskDeleted}
                  onEdit={handleEdit}
                />
              </>
            }
          />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;