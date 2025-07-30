import React from "react";

function TodoItem({ todo, index, toggleComplete, removeTodo, updateTodo }) {
  return (
    <div
      className="container d-flex mb-2 justify-content-between"
      style={{
        width: "80%",
        padding: "20px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "white",
      }}
    >
      <div className="container d-flex align-items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(index)}
        />
        <h5
          style={{
            margin: 0,
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "#888" : "#000",
          }}
        >
          {todo.text}
        </h5>
      </div>
      <div className="d-flex gap-3">
        <button
          className="btn btn-info btn-sm"
          onClick={() => updateTodo(index)}
        >
          Update
        </button>

        <button
          className="btn btn-danger btn-sm "
          onClick={() => removeTodo(index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
