import AddEditBoard from "./AddEditBoard";

function EmptyBoard({type,boardModalOpen, setBoardModalOpen}){
    
    return(
        <div className=" bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col  items-center justify-center">
            <h2 className=" text-gray-500 font-bold">
                {
                    type === "edit" ? 
                    "This board is empty. Create a new column to get started."
                    : "There are no boards available. Create a new board to get started"
                }
            </h2>
            <button onClick={()=>{
                setBoardModalOpen(true);
            }}
            className="w-full items-center max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 relative  text-white bg-[#635fc7] py-2 rounded-full"
            >
                {type==="edit" ? "Add New column" : "Add New Board"}
            </button>
            {
                boardModalOpen && (
                    <AddEditBoard
                    type={type}
                    setBoardModalOpen={setBoardModalOpen}
                    />
                )
            }

        </div>
    )
}
export default EmptyBoard;