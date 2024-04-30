import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TiDelete } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import boardSlice from "../redux/boardSlices";

function AddEditTask({
  setTaskModalOpen,
  setIsAddTaskModalOpen,
  type,
  device,
  taskIndex,
  prevColIndex = 0,
}) {
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;

  const col = columns.find((col, index) => index === prevColIndex);
  console.log("col", col);
  // const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const task = col?.tasks?.find((task, index) => index === taskIndex) || [];

  console.log("task", task);
  const [status, setStatus] = useState(columns[prevColIndex].name);

  const onChangeSubTask = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  if (type === "edit" && firstLoad && task && task.subTasks) {
    setSubtasks(
      task.subTasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setFirstLoad(false);
  }

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  function deleteHandler(id) {
    setSubtasks((prev) => prev.filter((del) => del.id !== id));
  }

  function validate() {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  }

  function onSubmit() {
    if (type === "add") {
      dispatch(
        boardSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  }

  return (
    <div
      className={
        device === "mobile"
          ? "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-[-100vh] top-0 dropdown "
          : "  py-6 px-6 pb-40  absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setTaskModalOpen(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto mt-4 w-full px-8  py-8 rounded-xl"
      >
        
        <h2>{type === "edit" ? "Edit" : "Add New"}</h2>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            value={title}
            id="task-name-input"
            placeholder="take a break"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
          />
        </div>

        {/* description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"
            value={description}
            placeholder=" It's always good to take a break. This 
                15 minute break will  recharge the batteries 
                a little."
            id="write description"
          />
        </div>

        {/* subTasks */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Sub Task
          </label>
          {subtasks.map((subtask, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                type="text"
                className=" bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                value={subtask.title}
                placeholder="add sub task"
                onChange={(e) => {
                  onChangeSubTask(subtask.id, e.target.value);
                }}
              />

              <TiDelete
                className=" m-4 cursor-pointer "
                onClick={() => {
                  deleteHandler(subtask.id);
                }}
              />
            </div>
          ))}
          <button
            onClick={() =>
              setSubtasks((prev) => [
                ...prev,
                { title: "", isCompleted: false, id: uuidv4() },
              ])
            }
            className=" w-full items-center dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
          >
            add new subtask
          </button>
        </div>

        {/* current status */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            current status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option value={column.name} key={index}>
                {column.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
        
                // type === "edit" && setTaskModalOpen(false);
                type = "edit" && setTaskModalOpen(false) ? setIsAddTaskModalOpen(false): null
              }

            }}
          >
            {type === "edit" ? "Save edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddEditTask;

// const task = col?.tasks?.find((task, index) => index === taskIndex) || {};

// if (type === "edit" && firstLoad) {
//   setSubtasks(
//     task.subTasks.map((subtask) => {
//       return { ...subtask, id: uuidv4() };
//     })
//   );
//   setTitle(task.title);
//   setDescription(task.description);
//   setFirstLoad(false);
// }
