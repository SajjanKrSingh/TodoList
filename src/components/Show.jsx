import { useContext, useState, useEffect } from "react";
import { todocontext } from "../Context/Context";

const Show = () => {
  const [tasks, settasks] = useContext(todocontext);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      settasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const DeleteHandler = (i) => {
    let isValid = false;
    if (!tasks[i].completed) {
      isValid = confirm("Do you really Want to delete this Task?");
    }

    if (isValid || tasks[i].completed) {
      const updatedTasks = tasks.filter((task, index) => index !== i);
      settasks(updatedTasks);
    }
  };

  const CompleteTaskToggle = (i) => {
    const copyTasks = [...tasks];
    copyTasks[i].completed = !tasks[i].completed;
    settasks(copyTasks);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].title);
  };

  const handleSave = (index) => {
    const copyTasks = [...tasks];
    copyTasks[index].title = editText;
    settasks(copyTasks);
    setEditIndex(null);
    setEditText("");
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditText("");
  };

  const tasksrender = tasks.length > 0 ? (
    tasks.map((task, index) => (
      <li
        key={index}
        className="mb-5 flex justify-between items-center border rounded-xl p-2 lg:p-5"
      >
        <div className="flex items-center">
          <div
            onClick={() => CompleteTaskToggle(index)}
            className={`${
              task.completed ? "bg-green-500" : "border"
            } mr-4 rounded-full lg:w-[30px] w-[20px] h-[20px] lg:h-[30px] border-orange-600`}
          ></div>
          {editIndex === index ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="lg:text-2xl font-extrabold text-yellow-100 bg-transparent border-b border-yellow-100 focus:outline-none"
            />
          ) : (
            <h1
              className={`${
                task.completed && "line-through"
              } lg:text-2xl font-extrabold text-yellow-100`}
            >
              {task.title}
            </h1>
          )}
        </div>
        <div className="flex gap-3 lg:text-2xl text-yellow-100">
          {editIndex === index ? (
            <>
              <i onClick={() => handleSave(index)} className="ri-check-line"></i>
              <i onClick={handleCancel} className="ri-close-line"></i>
            </>
          ) : (
            <>
              <i onClick={() => handleEdit(index)} className="ri-file-edit-line"></i>
              <i onClick={() => DeleteHandler(index)} className="ri-delete-bin-3-line"></i>
            </>
          )}
        </div>
      </li>
    ))
  ) : (
    <h1 className="text-center text-orange-500 font-extrabold text-2xl">
      No pending Tasks...
    </h1>
  );

  return <ul className="list-none mt-3 lg:mt-0 lg:w-[35%] w-[80%]">{tasksrender}</ul>;
};

export default Show;
