import { useRef, useState, useEffect } from "react";
import useTodo from "../contexts/TodoContext";

export const TodoForm = ({ className = "" }) => {
  const [task, setTask] = useState("");
  const { addTodo } = useTodo();
  const inputRef = useRef();

  function handlePressEnter(e) {
    if (e.key == "Enter") {
      add();
    }
  }

  useEffect(() => {
    inputRef.current.addEventListener("keydown", handlePressEnter);

    return () => {
      inputRef.current.removeEventListener("keydown", handlePressEnter);
    };
  }, []);

  function add() {
    if (!task) return;
    addTodo({ task, completed: false });
    setTask("");
    inputRef.current.value = "";
  }
  return (
    <div className={`flex h-[40px] md:h-[50px] ${className}`}>
      <input
        ref={inputRef}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        className="flex-1 w-full px-4 bg-white/30 text-white/90 outline-none border-none caret-white rounded-l-[4px] placeholder:text-white/90"
        placeholder="Write a Todo..."
      />
      <button
        onClick={add}
        className="bg-green-500 hover:bg-green-600 text-center basis-1/3 sm:basis-1/4 md:basis-1/5 text-base md:text-lg text-white rounded-r-[4px]"
      >
        Add
      </button>
    </div>
  );
};
