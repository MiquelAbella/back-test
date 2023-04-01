import React, { useState } from "react";
import { useTodos } from "../../Context/TodosContext";

export const Todo = ({ todo }) => {
  const { deleteTodo, updateTodo } = useTodos();
  const [updatedTodo, setUpdatedTodo] = useState("");

  const handleDeleteTodo = () => {
    deleteTodo(todo.todoId);
  };

  const handleUpdateTodo = (e) => {
    setUpdatedTodo(e.target.value);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    updateTodo({ ...todo, todo: updatedTodo });
  };

  return (
    <div className="w-full flex items-center justify-between p-4 border-b border-t border-white">
      <p>{todo.todo}</p>
      <div className="flex gap-6">
        <form onSubmit={handleSubmitEdit}>
          <input value={updatedTodo} onChange={handleUpdateTodo} />
          <button>update</button>
        </form>
        <button
          className="bg-red-500 p-4 rounded-md"
          onClick={handleDeleteTodo}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
