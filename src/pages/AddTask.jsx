import { useState } from "react";
import Navbar from "../components/Navbar";

function AddTask({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
  id: Date.now(),
  title,
  description,
  priority,
  dueDate,
  status: "Pending",
};

setTasks([...tasks, newTask]);
    alert("Task Added Successfully");

    setTitle("");
    setDescription("");
    setPriority("High");
    setDueDate("");

    console.log({
      title,
      description,
      priority,
      dueDate,
    });
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
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <br />

        <div>
          <label>Due Date</label>
          <br />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTask;