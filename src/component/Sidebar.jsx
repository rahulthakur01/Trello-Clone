import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import boardSlice from "../redux/boardSlices";
import AddEditBoard from "../modal/AddEditBoard";
import { useState } from "react";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();
  function toggleSideBar() {
    setIsSideBarOpen((current) => !current);
  }

  return (
    <div className="sidebar">
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37] w-64 fixed top-[72px] h-screen  items-center left-0 z-20  transition-all duration-300 ease-in-out`
            : `bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full`
        }
      >
        <div>
          
          {/* rewrite modal */}
          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37] w-full py-4 rounded-xl">
              <p className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                ALL BOARDS( {boards?.length})
              </p>
              <div className=" dropdown-borad flex flex-col h-[70vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={` flex items-baseline space-x-2 px-5 mr-8 rounded-r-full duration-500 ease-in-out py-4 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${
                        board.isActive &&
                        " bg-[#635fc7] rounded-r-full text-white mr-8 "
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <p className=" text-lg font-bold ">{board.name}</p>
                    </div>
                  ))}

                  <div
                    className=" flex  items-baseline space-x-2  mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-4 hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white  "
                    onClick={() => {
                      setIsBoardModalOpen(true);
                    }}
                  >
                    <p className=" text-lg font-bold  ">Create New Board </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* sidebar show and hidden */}
          {isSideBarOpen ? (
            <div
             onClick={toggleSideBar}
              className=" flex  items-center mt-2 absolute bottom-16 text-lg font-bold rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
            >
              <FaArrowLeft />
              {isSideBarOpen && <p> Hide Sidebar </p>}
            </div>
          ) : (
            <div className=" absolute p-5 " onClick={toggleSideBar}>
              <FaArrowRight />
            </div>
          )}
         
        </div>
      </div>

      {isBoardModalOpen && (
            <AddEditBoard type="add" setBoardModalOpen={setIsBoardModalOpen} />
          )}
    </div>
  );
}
export default Sidebar;


