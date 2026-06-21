import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 🌙 DARK MODE STATE
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // 💾 Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 💾 Save theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      
      {/* 🌙 Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
          cursor: "pointer",
          zIndex: 9999
        }}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                tasks={tasks}
                setTasks={setTasks}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/add-task"
            element={
              <AddTask
                tasks={tasks}
                setTasks={setTasks}
                darkMode={darkMode}
              />
            }
          />

          <Route
            path="/edit-task/:id"
            element={
              <EditTask darkMode={darkMode} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;