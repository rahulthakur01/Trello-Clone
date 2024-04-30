import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlices";
export const store = configureStore(
    {
        reducer:{
            boards:boardSlice.reducer,
        }
    }
) 
export default store;