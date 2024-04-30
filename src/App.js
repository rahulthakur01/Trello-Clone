import "./App.css";
import Header from "./component/Header";
import EmptyBoard from "./modal/EmptyBoard";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import boardSlice from "./redux/boardSlices";
import Home from "./component/Home";
function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0) {
    dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
  }
  return (
    <div className=" overflow-hidden overflow-x-hidden ">
      <div>
        {boards.length > 0 ? (
          <>
            <Header
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
            <Home
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}

             
            />
          </>
        ) : (
          <div>
            <EmptyBoard
              type="add"
              boardModalOpen={boardModalOpen}
              setBoardModalOpen={setBoardModalOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
