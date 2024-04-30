import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Column from "./Column";
import EmptyBoard from "../modal/EmptyBoard";
import AddEditBoard from "../modal/AddEditBoard";

function Home() {
  const [windowSize, setWindowSize] = useState([
    window.innerHeight,
    window.innerWidth,
  ]);
const [boardModalOpen, setBoardModalOpen] = useState(false)
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;
  return (
    <div className="">
      <div
        className={
          windowSize[0] >= 768 && isSideBarOpen
            ? ' bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-[#20212c]  overflow-x-scroll gap-6  ml-[261px]'
            :'bg-[#f4f7fd]  border border-yellow-500 scrollbar-hide h-screen flex  dark:bg-[#20212c] overflow-x-scroll gap-6 '
        }
      >
        {windowSize[0] >= 768 && (
          <Sidebar
          
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
        )}

        {columns && columns.length > 0 ? (
          <div className="flex">
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} />
            ))}
            <div
              onClick={() => {
                setBoardModalOpen(true);
              }}
              className=" newcolumn h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2 mx-5 pt-[70px] min-w-[280px] text-[#828FA3] mt-[120px] rounded-lg "
            >
              + Add new column
            </div>
          </div>
        ) : (
          <div>
            <EmptyBoard type="edit" />
          </div>
        )}
        {boardModalOpen && (
          <AddEditBoard type="edit" setBoardModalOpen={setBoardModalOpen} />
        )}
      </div>
    </div>
  );
}
export default Home;
