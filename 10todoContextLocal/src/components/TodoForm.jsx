import React, { useState } from "react";
import { useToDo } from "../context";

function TodoForm() {
  const [todo, setTodo] = useState("");

  //need to call addtodo function so get it from context

  const { addTodo } = useToDo();

  const add = (e) => {
    e.preventDefault();
    if (todo) {
      console.log("i m in here");
      const todoObjectToSend = { id: Date.now(), todo: todo, completed: false };
      console.log("submitted todo", todoObjectToSend);
      addTodo(todoObjectToSend);
      //setTodo("");
    } else {
      console.log("i m here");
      return;
    }
  };

  return (
    <form className="flex" onSubmit={add}>
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
