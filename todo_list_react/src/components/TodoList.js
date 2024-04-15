import React, { useState, useEffect } from "react";
import "./TodoList.css";

function TodoList() {
  // State variables for tasks, new task title, and filter
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

  // Handler for updating new task title state
  const handleTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  // Handler for form submission to add a new task
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

  // Handler for toggling task completion status
  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  // Handler for deleting a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Filter tasks based on the selected filter option

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
          {/* Todo list title */}
          <h1>Todo List</h1>
          {/* Form for adding new tasks */}
          <form onSubmit={handleSubmit} className="form-container">
            <input
              type="text"
              placeholder="Enter task title"
              value={newTaskTitle}
              onChange={handleTitleChange}
            />
            <button type="submit">Add Task</button>
          </form>

          {/* Filter buttons */}
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
          {/* Task list */}
          <ul>
            {filteredTasks.map((task) => (
              <li key={task.id} className="list_name">
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* Checkbox for toggling task completion */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                  />
                  {/* Task title with conditional line-through styling */}
                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                      marginLeft: "10px",
                      // Add margin for spacing
                    }}
                  >
                    {task.title}
                  </span>
                </div>
                {/* Button to delete the task */}
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
