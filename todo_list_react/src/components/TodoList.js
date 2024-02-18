import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim() !== "") {
      setTasks([
        { id: Date.now(), title: newTaskTitle, completed: false },
        ...tasks,
      ]);
      setNewTaskTitle("");
    }
  };

  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "incomplete") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="container">
      <div className="todo_list">
        <div className="form">
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={handleTitleChange}
            />
            <button type="submit">Add Task</button>
          </form>

          <div className="toggle">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "completed" ? "active" : ""}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className={filter === "incomplete" ? "active" : ""}
              onClick={() => setFilter("incomplete")}
            >
              Incomplete
            </button>
          </div>

          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id} className="list_name">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                  />
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      marginLeft: "10px", // Add margin for spacing
                    }}
                  >
                    {task.title}
                  </span>
                </div>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
