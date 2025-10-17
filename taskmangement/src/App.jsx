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

  const fetchTasks = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/tasks`).then(res => {
      setTasks(res.data);
      setFilteredTasks(res.data);
    });
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleTaskAdded = (newTask) => {
    setTasks(prevTasks => {
      const updated = [...prevTasks, newTask];
      if (!searchQuery) {
        setFilteredTasks(updated);
      }
      return updated;
    });
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks => {
      const updated = prevTasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      setFilteredTasks(prevFiltered => 
        prevFiltered.map(t => t.id === updatedTask.id ? updatedTask : t)
      );
      return updated;
    });
    setEditTask(null);
  };

  const handleTaskDeleted = (deletedId) => {
    console.log("Deleting task with ID:", deletedId);
    setTasks(prevTasks => {
      const updated = prevTasks.filter(t => t.id !== deletedId);
      console.log("Updated tasks:", updated);
      return updated;
    });
    setFilteredTasks(prevFiltered => {
      const updated = prevFiltered.filter(t => t.id !== deletedId);
      console.log("Updated filtered tasks:", updated);
      return updated;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(lowercasedQuery) ||
      task.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredTasks(filtered);
  };

  return (
    <Router>
      <div className="container">
        <h1 style={{ textAlign: "center", marginBottom: "28px", color: "#2b2ff1ff" }}>⏰Task Manager⏰</h1>
        <nav style={{ marginBottom: "20px", textAlign: "center" }}>
          <Link to="/" style={{ marginRight: "15px" }}><b>ADD TASKS</b></Link>
          <Link to="/summary"><b>VIEW SUMMARY</b></Link>
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