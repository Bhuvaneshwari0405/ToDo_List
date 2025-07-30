import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, toggleComplete, removeTodo , updateTodo}) {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem 
          key={index}
          index={index}
          todo={todo}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
      <br />
    </div>
  );
}
export default TodoList;