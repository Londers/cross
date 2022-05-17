import {CrossBuildMsg} from "../common";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";

const initialState: CrossBuildMsg = {
    access: undefined,
    cross: undefined,
    dk: undefined,
    edit: false,
    eth: false,
    modeRdk: "",
    phases: [],
    scon: false,
    sfdk: false,
    state: undefined,
    techMode: ""
}

export const crossSlice = createSlice({
    name: "crossSlice",
    initialState,
    reducers: {
        setInitialData: (state, action: PayloadAction<CrossBuildMsg>) => {
            // state = action.payload
            Object.assign(state, action.payload)
        }
    }
})

export const {setInitialData} = crossSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo
export const selectDescription = (state: RootState) => state.crossInfo.cross?.description
export const selectPhases = (state: RootState) => state.crossInfo.phases

export default crossSlice.reducer