import React, { useState } from "react";
import axios from "axios";
import "./Summary.css";

function Summary() {
  const [summary, setSummary] = useState([]);
  const [status, setStatus] = useState(""); // Add status filter

  const fetchSummary = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tasks/last7days`, {
        params: status ? { status } : {},
      })
      .then((res) => setSummary(res.data));
  };

  return (
    <div className="summary">
      <h2>📅Tasks Summary</h2>
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={fetchSummary}>Load Summary</button>
      <ul>
        {summary.map((t) => (
          <li key={t.id}>
            {new Date(t.createdAt).toLocaleDateString()} - {t.title}
            {t.description ? ` - ${t.description}` : ""} ({t.status})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;