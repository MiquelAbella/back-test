import { useEffect, useState } from "react";
import "./App.css";
import { Todo } from "./Components/Todo";
import { useTodos } from "./Context/TodosContext";

function App() {
  const { addTodo, todos, getTodos } = useTodos();
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTodo(todoInput);
  };

  return (
    <div className="flex flex-col  items-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
        <input
          value={todoInput}
          onChange={handleInputChange}
          className="px-4 py-2 border-b border-gray-500 outline-none"
          placeholder="enter a todo"
        />
        <button className="border border-gray-500">Submit</button>
      </form>
      <div className="w-full mt-20 min-h-screen bg-slate-400">
        <p className="mt-4">Inputs Container</p>

        {todos.map((todo, idx) => {
          return <Todo key={idx} todo={todo} />;
        })}
      </div>
    </div>
  );
}

export default App;
