import { useSelector, useDispatch } from "react-redux";
import boardSlice from "../redux/boardSlices";

function HeaderDropDown({ setShowDropIcon, setBoardModalOpen }) {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  return (
    <div
      onClick={(event) => {
        if (event.target !== event.currentTarget) {
          return;
        }
        setShowDropIcon(false);
      }}
      className=" py-10 px-6 absolute  left-0 right-0 bottom-[-100vh] top-16 dropdown "
    >
      <div className=" bg-gray-500 dark:bg-[#2b2c37] shadow-md shadow-[#364e7e1a]  w-full   py-4 rounded-xl">
        <p className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          All boards ({boards?.length})
        </p>

        <div className=" dropdown-borad  ">
          {boards.map((board, index) => {
            return (
              <div
                className={` flex items-baseline space-x-2 px-5 py-4 ${
                  board.isActive &&
                  " bg-[#635fc7] rounded-r-full text-white mr-8 "
                }`}
                key={index}
                onClick={() => {
                  dispatch(boardSlice.actions.setBoardActive({ index }));
                }}
              >
                <p className=" text-lg font-bold ">{board.name}</p>
              </div>
            );
          })}

          <div
            className=" flex items-baseline space-x-2  text-black px-5 py-4  "
            onClick={() => {
              setBoardModalOpen(true);
              setShowDropIcon(false);
            }}
          >
            <p className=" text-lg font-bold  ">create new board</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HeaderDropDown;
