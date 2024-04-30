import { useSelector } from "react-redux";
import { useState } from "react";
import TaskModal from "../modal/TaskModal";
function Task({ taskIndex, colIndex }) {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards?.find
    ? boards?.find((board) => board.isActive === true)
    : [];
  // const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col ? col.tasks?.find((task, i) => i === taskIndex) : [];
  let completed = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });
  function handleOnDrag(e){
    e.dataTransfer.setData("text",
  JSON.stringify({taskIndex, prevColIndex: colIndex})
  )
  }



  return (
    <div className="task-box">
      <div
        onClick={() => {
          setTaskModalOpen(true);
        }}
        draggable
        onDragStart={handleOnDrag}
        className=" w-[280px] first:my-5 rounded-lg  bg-white  dark:bg-[#2b2c37] shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white dark:hover:text-[#635fc7] cursor-pointer "
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
        <p className=" font-bold text-xs tracking-tighter mt-2 text-gray-500">
          {completed} of {subtasks.length} completed tasks
        </p>
      </div>
      {taskModalOpen && (
        <TaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setTaskModalOpen={setTaskModalOpen}
        />
      )}
    </div>
  );
}
export default Task;
