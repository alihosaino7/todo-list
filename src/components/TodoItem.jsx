import { useState, useRef, useEffect } from "react";
import useTodo from "../contexts/TodoContext";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

export const TodoItem = ({ todo, className = "" }) => {
  const { deleteTodo, updateTodo, toggleComplete } = useTodo();
  const [todoTask, setTodoTask] = useState(todo?.task || "");
  const [isEditable, setIsEditable] = useState(false);
  const todoInputRef = useRef();
  const todoNameRef = useRef()

  const [todoInputDimensions, setTodoInputDimensions] = useState({ width: 0, height: 0 })

  useEffect(foucsTaskInput, [isEditable]);

  function foucsTaskInput() {
    if (isEditable) {
      todoInputRef.current.focus();
    }
  }

  function handleEditClick() {
    const { width, height } = todoNameRef.current.getBoundingClientRect();
    setTodoInputDimensions({ width, height })
    setIsEditable(true);
  }

  function handleSaveEdit() {
    updateTodo(todo.id, { ...todo, task: todoTask });
    setIsEditable(false);
  }

  const displayEditableTodoName = (
    <textarea
      type="text"
      onChange={(e) => setTodoTask(e.target.value)}
      ref={todoInputRef}
      style={{ height: todoInputDimensions.height, width: todoInputDimensions.width + 8 }}
      className="outline-none rounded-[4px] w-full border-solid border-black border-[1px] resize-none p-1"
    >{todoTask}</textarea>
  )

  const displayTodoName = <p ref={todoNameRef} className={todo?.completed ? "line-through break-all" : "break-all"}>{todo?.task}</p>

  return (
    <div
      className={`bg-white h-fit rounded-[4px] gap-2 flex items-center justify-between p-2 pl-4 ${className}`}
    >
      <div className="flex items-center gap-4">
        <input
          onChange={() => toggleComplete(todo.id)}
          type="checkbox"
          className="w-[15px] h-[15px]"
          checked={todo?.completed}
        />

        {isEditable ? displayEditableTodoName : displayTodoName}

      </div>
      <div className="flex gap-0.5 md:gap-2">
        <EditButton onClick={isEditable ? handleSaveEdit : handleEditClick}>{isEditable ? "📁" : "✏️"}</EditButton>
        <DeleteButton onClick={() => deleteTodo(todo.id)}>❌</DeleteButton>
      </div>
    </div>
  );
};
