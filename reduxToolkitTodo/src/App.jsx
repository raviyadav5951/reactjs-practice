import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  
  return (
    <>
      <div>
        <h2>Learn about redux toolkit</h2>

        <AddTodo />
        <Todos />
      </div>
    </>
  );
}

export default App;
