import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import ThreeDosts from "../component/ThreeDots";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import Subtask from "../component/Subtask";
import AddEditTask from "./AddEditTask";
import boardSlice from "../redux/boardSlices";
import { RxCross2 } from "react-icons/rx";

function TaskModal({ colIndex, taskIndex, setTaskModalOpen }) {
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [closeSubtask, setCloseSubtask] = useState(false);

  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [status, setStatus] = useState(task.status);

  function onChange(e) {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  }

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  function onClose(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(
      boardSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );
    setIsAddTaskModalOpen(false);
    setTaskModalOpen(false);
  }

  function onDeleteBtnClick(e) {
    if (e.target.textContent === "Delete") {
      dispatch(boardSlice.actions.deleteTask({ taskIndex, colIndex }));
      setTaskModalOpen(false);
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  }
  function closeSubtaskHandler(){
    setCloseSubtask(false);
    setTaskModalOpen(false);
  }

  return (
    <div
      onClick={onClose}
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
    >
      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>
          <div className="absolute top-[-1.6rem] right-[-1.5rem]  text-gray-900 p-1 "
          onClick={closeSubtaskHandler}
          >
            <RxCross2 />
          </div>
          <div
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState);
            }}
          >
            <BsThreeDotsVertical />
          </div>
          {isElipsisMenuOpen && (
            <ThreeDosts
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>

        <p className=" text-gray-500 font-[600] tracking-wide text-xs pt-6">
          {task.description}
        </p>

        <p className=" pt-6 text-gray-500 tracking-widest text-sm">
          Subtasks ({completed} of {subtasks.length})
        </p>

        {/* subtask section */}
        <div>
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                key={index}
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
              />
            );
          })}
        </div>

        {/* current status */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            current status
          </label>
          <select
            className=" select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            value={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option key={index}>{col.name}</option>
            ))}
          </select>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          type="task"
          title={task.title}
        />
      )}
      {isAddTaskModalOpen && (
        <AddEditTask
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          type="edit"
          setTaskModalOpen={setTaskModalOpen}
          taskIndex={taskIndex}
          prevColIndex={colIndex}
        />
      )}
    </div>
  );
}
export default TaskModal;
