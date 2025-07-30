import React, { useState } from "react";

function TodoForm(props) {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    props.addTodo(text); 
    setText("");
  };
  return (
    <form onSubmit={handleSubmit} className="mb-3" style={{width:"80%", border:"1px solid #ccc", padding:"40px", margin:"auto"}}>
      <input
        type="text"
        value={text}
        placeholder="Enter Your Task..."
        onChange={(e) => setText(e.target.value)}
        className="form-control mb-2"
      /><br></br>
      <button className="btn btn-primary btn-md" type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoForm;