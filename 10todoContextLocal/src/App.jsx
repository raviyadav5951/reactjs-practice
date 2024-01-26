import { useEffect, useState } from "react";
import { TodoProvider, useToDo } from "./context";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    console.log("addTodo called", newTodo);
    setTodos((prevTodo) => [...prevTodo, newTodo]);
  };

  /**
   * First match the matching todo with id
   * If matched then update the complete object and keep the rest non matched as it is
   */
  const updateTodo = (id, updatedTodoObject) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? updatedTodoObject : prevTodo
      )
    );
  };

  /** return the aray which doesn't match the id so we will get filtered array */

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * first find the matching todo with id
   * if matched then keep the rest details as it is using spread, just update the id
   * if not matched then dont change prevTodo
   */

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    //save it as string
    console.log("use effect claled");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todoItem) => (
              <div key={todoItem.id} className="w-full">
                <TodoItem todoObject={todoItem} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
