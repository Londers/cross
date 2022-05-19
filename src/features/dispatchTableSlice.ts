import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

const initialState = {}

export const dispatchTableSlice = createSlice({
        name: "dispatchTable",
        initialState,
        reducers: {
            setInitialData: (state, action: PayloadAction<any>) => {

            },
        }
    }
)

export const {setInitialData} = dispatchTableSlice.actions

export const selectDispatchTable = (state: RootState) => state.dispatchTable

export default dispatchTableSlice.reducer