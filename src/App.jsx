import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import { TodoItem, TodoForm } from "./components";
import { nanoid } from "nanoid";

function App() {
  const initialTodos = JSON.parse(localStorage.getItem("todos"));

  const [todos, setTodos] = useState(
    initialTodos && initialTodos.length > 0 ? initialTodos : []
  );

  function updateTodo(id, newTodo) {
    setTodos(todos.map((todo) => (todo.id == id ? newTodo : todo)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function addTodo(todo) {
    setTodos([...todos, { id: Date.now(), ...todo }]);
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) => {
        const toggledTodo = { ...todo, completed: !todo.completed };
        return todo.id == id ? toggledTodo : todo;
      })
    );
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(saveTodos, [todos]);

  const displayTodos = todos.map((todo) => (
    <TodoItem key={nanoid()} todo={todo} />
  ))

  return (
    <TodoProvider
      value={{ todos, updateTodo, deleteTodo, addTodo, toggleComplete }}
    >
      <div className="bg-slate-800 w-full min-h-screen py-10">
        <div className="container mx-auto w-[90%] md:w-[700px]">
          <h1 className="font-bold mb-8 text-2xl text-white text-center">Manage Your Todos</h1>
          <TodoForm className="w-full mb-4" />
          <div className="flex flex-col gap-4">{displayTodos}</div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
