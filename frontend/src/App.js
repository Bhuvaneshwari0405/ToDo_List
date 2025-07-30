import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    axios
      .get("https://todo-list-957a.onrender.com/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);

  const addTodo = (text) => {
    axios
      .post("https://todo-list-957a.onrender.com/api/todos", { text })
      .then((res) => setTodos([...todos, res.data]))
      .catch((err) => console.error("Error adding todo:", err));
  };

  const toggleComplete = (index) => {
    const id = todos[index]._id;
    axios
      .patch(`https://todo-list-957a.onrender.com/api/todos/${id}`)
      .then((res) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = res.data;
        setTodos(updatedTodos);
      })
      .catch((err) => console.error("Error toggling todo:", err));
  };

  const removeTodo = (index) => {
    const id = todos[index]._id;
    axios
      .delete(`https://todo-list-957a.onrender.com/api/todos/${id}`)
      .then(() => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };
  const updateTodo = (index) => {
    setCurrentTodoIndex(index);
    setEditText(todos[index].text);
    setShowModal(true);
  };

  const saveUpdatedTodo = () => {
    const id = todos[currentTodoIndex]._id;
    axios
      .put(`https://todo-list-957a.onrender.com/api/todos/${id}`, { text: editText })
      .then((res) => {
        const updatedTodos = [...todos];
        updatedTodos[currentTodoIndex] = res.data;
        setTodos(updatedTodos);
        setShowModal(false);
      })
      .catch((err) => console.error("Error updating todo:", err));
  };

  return (
    <div
      className="container mt-5"
      style={{
        width: "50%",
        border: "1px solid black",
        padding: "40px",
        margin: "auto",
      }}
    >
      <h1 className="mb-4 text-center">Todo List</h1>
      {/* Edit Todo Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveUpdatedTodo}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
