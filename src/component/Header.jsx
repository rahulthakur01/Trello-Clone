import Logo from "../image/logo.png";
import { IoIosArrowUp } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import HeaderDropDown from "./HeaderDropDown";
import AddEditBoard from "../modal/AddEditBoard";
import AddEditTask from "../modal/AddEditTask";
import ThreeDosts from "./ThreeDots";
import DeleteBoard from "./DeleteBoard";
import boardSlice from "../redux/boardSlices";

function Header(props) {
  let boardModalOpen = props.boardModalOpen;
  let setBoardModalOpen = props.setBoardModalOpen;

  const [showDropIcon, setShowDropIcon] = useState(false);
  const [TaskModalOpen, setTaskModalOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [threeDotsVertical, setThreeDotsVertical] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((b) => b.isActive);
  const dispatch = useDispatch();
  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setThreeDotsVertical(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setThreeDotsVertical(false);
  };

  function onDeleteBtnClick(e) {
    if (e.target.textContent === "Delete") {
      dispatch(boardSlice.actions.deleteBoard());
      dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  }

  function onDropDownClck() {
    setShowDropIcon((state) => !state);
    setThreeDotsVertical(false);
    setBoardType("add");
  }

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-[#2b2c37] z-50 right-0 ">
      <div className="flex justify-between dark:text-white items-cente">
        {/* left part */}
        <div className="flex items-center space-x-2  md:space-x-4">
          <img
            src={Logo}
            alt="Logo"
            style={{ fontSize: "5rem" }}
            className="h-6 w-6"
          />
          <h1 className="md:text-3xl  hidden md:inline-block font-bold  font-sans">
            Trello
          </h1>
        </div>

        <div className=" flex items-center ">
          <h3 className=" truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans  ">
            {board.name}
          </h3>
          <div
            // onClick={() => setShowDropIcon((prev) => !prev)}
            onClick={onDropDownClck}
            className="w-3 ml-2 cursor-pointer md:hidden"
          >
            {showDropIcon ? <IoIosArrowUp /> : <IoChevronDownOutline />}
          </div>
        </div>

        {/* right part */}
        <div className=" flex space-x-4 items-center md:space-x-6">
          <button
            className=" button hidden md:block text-md font-semibold"
            onClick={() => {
              setTaskModalOpen((prev) => !prev);
            }}
          >
            Add Task
          </button>

          <button
            onClick={() => setTaskModalOpen((prev) => !prev)}
            className=" button py-1 px-3 md:hidden rounded-full bg-blue-500 font-semibold"
          >
            +
          </button>
          <div
            className=" cursor-pointer h-6 w-6 font-bold text-2xl"
            onClick={() => {
              setBoardType("edit");
              setShowDropIcon(false);
              setThreeDotsVertical((state) => !state);
            }}
          >
            <BsThreeDotsVertical />
          </div>
          {threeDotsVertical && (
            <ThreeDosts
              type="Boards"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>
      </div>

      {showDropIcon && (
        <HeaderDropDown
          setShowDropIcon={setShowDropIcon}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {boardModalOpen && (
        <AddEditBoard
          type={boardType}
          setBoardType={setBoardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}

      {TaskModalOpen && (
        <AddEditTask
          setTaskModalOpen={setTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isDeleteModalOpen && (
        <DeleteBoard
          type="board"
          title={board.name}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}
export default Header;
