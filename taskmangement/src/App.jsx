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
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Sync filteredTasks whenever tasks change
  useEffect(() => {
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = tasks.filter(task =>
        task.title.toLowerCase().includes(lowercasedQuery) ||
        task.description.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [tasks, searchQuery]);

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
    fetchTasks();
  };

  const handleTaskUpdated = (updatedTask) => {
    fetchTasks();
    setEditTask(null);
  };

  const handleTaskDeleted = async (deletedId) => {
    console.log("Delete callback triggered for ID:", deletedId);
    await fetchTasks();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

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