import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {DispatchMsg} from "../common";

const initialState: DispatchMsg[] = []

export const dispatchTableSlice = createSlice({
        name: "dispatchTable",
        initialState,
        reducers: {
            // setInitialData: (state, action: PayloadAction<any>) => {
            //     state = initialState
            // },
            setDispatch: (state, action: PayloadAction<DispatchMsg>) => {
                state.unshift(action.payload)
            },
        }
    }
)

export const {setDispatch} = dispatchTableSlice.actions

export const selectDispatchTable = (state: RootState) => state.dispatchTable

export default dispatchTableSlice.reducer