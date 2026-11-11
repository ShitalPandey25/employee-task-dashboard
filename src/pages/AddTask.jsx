import { useState } from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

// Today's date in local time (YYYY-MM-DD)
const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

function AddTask({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });

  const closeModal = () => setModal({ ...modal, isOpen: false });

  const showError = (message) =>
    setModal({ isOpen: true, title: "Invalid Date", message, type: "error" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = getToday();

    if (startDate < today) {
      showError("Start date cannot be in the past. Please choose today or a future date.");
      return;
    }

    if (dueDate < today) {
      showError("Due date cannot be in the past. Please choose today or a future date.");
      return;
    }

    if (dueDate < startDate) {
      showError("Due date cannot be earlier than the start date.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
      startDate,
      dueDate,
      status: "Pending",
    };

    setTasks([...tasks, newTask]);

    setModal({
      isOpen: true,
      title: "Success",
      message: "Task added successfully!",
      type: "success",
    });

    setTitle("");
    setDescription("");
    setPriority("High");
    setStartDate("");
    setDueDate("");
  };

  return (
    <div>
      <Navbar />

      <h1>Add Task</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Title</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Priority</label>
          <br />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <br />

        <div>
          <label>Start Date</label>
          <br />
          <input
            type="date"
            value={startDate}
            min={getToday()}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Due Date</label>
          <br />
          <input
            type="date"
            value={dueDate}
            min={startDate || getToday()}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">Add Task</button>
      </form>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={closeModal}
      />
    </div>
  );
}

export default AddTask;