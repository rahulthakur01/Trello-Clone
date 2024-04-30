import { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import { TiDelete } from "react-icons/ti";
import {useSelector} from "react-redux";
import boardSlice from "../redux/boardSlices";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";


function AddEditBoard({setBoardModalOpen, boardType, type}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true); 
  const[icon, setIcon] = useState(false)

  const [newColumns, setNewColumns] = useState([
    { name: "Todo", task: [], id: uuidv4() },
    { name: "Doing", task: [], id: uuidv4() },
  ]);

  const board = useSelector((state)=> state.boards).find((board)=> board.isActive)

  function onChange(id, newValue) {
    setNewColumns((prev) => {
      const newState = [...prev];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  }
  function deleteHandler(id) {
    setNewColumns((prev) => prev.filter((del) => del.id !== id));
  }

  if (type === "edit" && isFirstLoad) {
    setNewColumns(
      board.columns.map((col) => {
        return { ...col, id: uuidv4() };
      })
    );
    setName(board.name);
    setIsFirstLoad(false);
  }

  function validateForm() {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }
    for (let i = 0; i < newColumns.length; i++) {
      if (!newColumns[i].name.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  }

  function onSubmit(type) {
    setBoardModalOpen(false);
    if (type === "add") {
      dispatch(boardSlice.actions.addBoard({ name, newColumns }));
    } 
    else {
      dispatch(boardSlice.actions.editBoard({ name, newColumns }));
    }
   

  }
  function closeIconHandler(){
    setIcon(false)
    setBoardModalOpen(false);
  }

  return (
    <div
      className=" fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown "
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }
    }
    >
     
      <div
        className=" relative scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl "
      >
      <div className="absolute top-[1.5rem] right-4">
      <RxCross2 onClick={closeIconHandler}/>
      </div>
        <h2> {type === "edit" ? "Edit" : "Add New"} Board</h2>

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white border-red-500  text-gray-500">
            Board Name
          </label>
          <input 
            className=" bg-transparent  px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Wedding"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="board-name-input"
          />
        </div>

        {/* board column */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className=" text-sm dark:text-white text-gray-500">
            Board column
          </label>
          {newColumns.map((column, index) => (
            <div key={index} className=" flex items-center w-full ">
              <input
                className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]  "
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                type="text"
                value={column.name}
              />
              <TiDelete
                onClick={() => {
                  deleteHandler(column.id);
                }}
              />
            </div>
          ))}

          <div>
            <button
              onClick={() => {
                setNewColumns((state) => [
                  ...state,
                  { name: "", task: [], id: uuidv4() },
                ]);
              }}
              className=" w-full items-center hover:opacity-70 dark:text-[#635fc7] dark:bg-white  text-white bg-[#635fc7] py-2 rounded-full "
            >
              Add New column
            </button>

            <button
              onClick={() => {
                const isValid = validateForm();
                if (isValid === true){
                  onSubmit(type);
                }
                  
              }}
              className=" w-full items-center hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
            >
              {type === "add" ? "Create New Board" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddEditBoard;
