import React, { createContext, useContext, useReducer } from "react";
import { todosReducer } from "./todosReducer";
import { todoTypes } from "./types";

export const TodosContext = createContext();

const initialState = [];

export const useTodos = () => {
  const state = useContext(TodosContext);
  return state;
};

export const TodosContextProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, initialState);

  const addTodo = async (todo) => {
    const res = await fetch("http://localhost:4000/addtodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });
    const data = await res.json();

    if (data.ok) {
      dispatch({ type: todoTypes.add, payload: data.todo });
    }
  };

  const getTodos = async () => {
    const res = await fetch("http://localhost:4000/gettodos");
    const data = await res.json();

    if (data.ok) {
      dispatch({ type: todoTypes.getTodos, payload: data.todos });
    }
  };

  const deleteTodo = async (id) => {
    const res = await fetch(`http://localhost:4000/deletetodo/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.ok) {
      const filteredTodos = todos.filter((todo) => todo.todoId !== id);
      dispatch({ type: todoTypes.deleteTodo, payload: filteredTodos });
    }
  };

  const updateTodo = async (newTodo) => {
    const res = await fetch(`http://localhost:4000/updatetodo/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();

    if (data.ok) {
      //it is better to use a map function instead of that
      const filteredTodos = todos.filter(
        (todo) => todo.todoId !== newTodo.todoId
      );
      const allTodos = [...filteredTodos, newTodo];

      dispatch({ type: todoTypes.updateTodo, payload: allTodos });
    }
  };

  return (
    <TodosContext.Provider
      value={{ todos, addTodo, getTodos, deleteTodo, updateTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};
