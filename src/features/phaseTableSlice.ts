import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import {Dk, PhaseMsg} from "../common";
import {pointer} from "../common/phaseTableLib";

const initialState: Dk[] = []

export const phaseTableSlice = createSlice({
        name: "phaseTable",
        initialState,
        reducers: {
            addDK: (state, action: PayloadAction<PhaseMsg>) => {
                if (action.payload.dk.fdk === state[pointer.current]?.fdk) { // <= 9 ???
                    console.log("ignore duplicate", action.payload.dk)
                    return
                }
                if (action.payload.dk.fdk >= 9) {
                    state.splice(pointer.next, 1, action.payload.dk)
                    if (state.length !== 1) pointer.increment()
                } else {
                    if (state.length !== 0) state.splice(pointer.current, 1, action.payload.dk)
                }
            },
        }
    }
)

export const {addDK} = phaseTableSlice.actions

export const selectDKs = (state: RootState) => state.phaseTable

export default phaseTableSlice.reducer