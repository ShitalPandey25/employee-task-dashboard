import { useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard({ tasks, setTasks }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const markCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, status: "Completed" }
        : task
    );

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };

  const editTask = (id) => {
    const newTitle = prompt("Enter new task title:");

    if (!newTitle) return;

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, title: newTitle }
        : task
    );

    setTasks(updatedTasks);
  };

  return (
    <div>
      <Navbar />

      <h1>Employee Task Dashboard</h1>

      <h3>Total Tasks: {tasks.length}</h3>

      <h3>
        Completed Tasks: {
          tasks.filter(
            (task) => task.status === "Completed"
          ).length
        }
      </h3>

      <h3>
        Pending Tasks: {
          tasks.filter(
            (task) => task.status === "Pending"
          ).length
        }
      </h3>

      <input
        type="text"
        placeholder="Search Task Title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="All">All Tasks</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
        <option value="High">High Priority</option>
      </select>

      <hr />

      {tasks.length === 0 ? (
        <p>No Tasks Available</p>
      ) : (
        tasks
          .filter((task) =>
            task.title
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .filter((task) => {
            if (filter === "Completed") {
              return task.status === "Completed";
            }

            if (filter === "Pending") {
              return task.status === "Pending";
            }

            if (filter === "High") {
              return task.priority === "High";
            }

            return true;
          })
          .map((task) => (
            <div
              key={task.id}
              className="task-card"
            >
              <h2>{task.title}</h2>

              <p>{task.description}</p>

              <p>
                <strong>Priority:</strong> {task.priority}
              </p>

              <p>
                <strong>Status:</strong> {task.status}
              </p>

              <p>
                <strong>Due Date:</strong> {task.dueDate}
              </p>

              <button
                onClick={() => markCompleted(task.id)}
              >
                Complete
              </button>

              <button
                onClick={() => editTask(task.id)}
                style={{ marginLeft: "10px" }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteTask(task.id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          ))
      )}
    </div>
  );
}

export default Dashboard;