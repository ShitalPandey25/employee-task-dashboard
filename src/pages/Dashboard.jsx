import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

function Dashboard({ tasks, setTasks }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Popup state
  const [deleteId, setDeleteId] = useState(null);
  const [editTarget, setEditTarget] = useState(null); // { id, title }

  const markCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: "Completed" } : task
    );
    setTasks(updatedTasks);
  };

  const confirmDelete = () => {
    setTasks(tasks.filter((task) => task.id !== deleteId));
    setDeleteId(null);
  };

  const saveEdit = () => {
    const newTitle = editTarget.title.trim();
    if (!newTitle) return;

    const updatedTasks = tasks.map((task) =>
      task.id === editTarget.id ? { ...task, title: newTitle } : task
    );
    setTasks(updatedTasks);
    setEditTarget(null);
  };

  return (
    <div>
      <Navbar />

      <h1>Employee Task Dashboard</h1>

      <h3>Total Tasks: {tasks.length}</h3>

      <h3>
        Completed Tasks:{" "}
        {tasks.filter((task) => task.status === "Completed").length}
      </h3>

      <h3>
        Pending Tasks:{" "}
        {tasks.filter((task) => task.status === "Pending").length}
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
        <div className="task-grid">
          {tasks
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .filter((task) => {
              if (filter === "Completed") return task.status === "Completed";
              if (filter === "Pending") return task.status === "Pending";
              if (filter === "High") return task.priority === "High";
              return true;
            })
            .map((task) => (
              <div key={task.id} className="task-card">
                <h2>{task.title}</h2>

                <p>{task.description}</p>

                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>

                <p>
                  <strong>Status:</strong> {task.status}
                </p>

                <p>
                  <strong>Start Date:</strong> {task.startDate || "—"}
                </p>

                <p>
                  <strong>Due Date:</strong> {task.dueDate}
                </p>

                <button onClick={() => markCompleted(task.id)}>Complete</button>

                <button
                  onClick={() => setEditTarget({ id: task.id, title: task.title })}
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeleteId(task.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Delete confirmation popup */}
      <Modal
        isOpen={deleteId !== null}
        title="Delete Task"
        message="Are you sure you want to delete this task? This cannot be undone."
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {/* Edit title popup */}
      <Modal
        isOpen={editTarget !== null}
        title="Edit Task Title"
        confirmText="Save"
        cancelText="Cancel"
        onConfirm={saveEdit}
        onCancel={() => setEditTarget(null)}
      >
        {editTarget && (
          <input
            className="modal-input"
            type="text"
            autoFocus
            value={editTarget.title}
            onChange={(e) =>
              setEditTarget({ ...editTarget, title: e.target.value })
            }
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
          />
        )}
      </Modal>
    </div>
  );
}

export default Dashboard;