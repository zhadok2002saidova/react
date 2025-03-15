import React, { useState } from "react";


export default function ToDoList() {
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState([
    { taskName: "Гүл суару", completed: true },
    { taskName: "Кітап оқу", completed: false },
    { taskName: "Күнделікті үй жұмысын орындау", completed: false },
    { taskName: "Спортпен айналысу", completed: true },
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    if (task.trim() === "") return;
    setTasks([...tasks, { taskName: task, completed: false }]);
    setTask("");
  }

  function toggleComplete(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "complete") return t.completed;
    if (filter === "incomplete") return !t.completed;
    return true;
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={task}
          type="text"
          placeholder="Тапсырма қосу..."
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Қосу</button>
      </form>

      <div>
        <button onClick={() => setFilter("all")}>Барлығы</button>
        <button onClick={() => setFilter("complete")}>Орындалған</button>
        <button onClick={() => setFilter("incomplete")}>Орындалмаған</button>
      </div>

      <ul>
        {filteredTasks.map((tapsyrma, index) => (
          <li
            key={index}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span>{tapsyrma.taskName}</span>
            <button
              onClick={() => toggleComplete(index)}
              style={{
                color: tapsyrma.completed ? "green" : "red",
                fontSize: "16px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              {tapsyrma.completed ? "✔️" : "❌"}
            </button>
            <button
              onClick={() => deleteTask(index)}
              style={{
                color: "black",
                fontSize: "16px",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
