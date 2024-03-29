import {
    ChangeEditMsg,
    CrossBuildMsg,
    CrossConnectionMsg,
    CrossUpdateMsg,
    PhaseMsg,
    StateChangeMsg
} from "../common";
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
    techMode: "",
    model: undefined,
    svg: undefined,
    cameras: false,
    deviceElc: 0,
    deviceError: undefined
}

export const crossSlice = createSlice({
    name: "crossSlice",
    initialState,
    reducers: {
        setInitialData: (state, action: PayloadAction<CrossBuildMsg>) => {
            // state = action.payload
            Object.assign(state, action.payload)
        },
        setEdit: (state, action: PayloadAction<ChangeEditMsg>) => {
            state.edit = action.payload.edit
        },
        setCross: (state, action: PayloadAction<CrossUpdateMsg>) => {
            state.sfdk = action.payload.sfdk
            state.state = action.payload.state
            if (state.cross) state.cross.tlsost = action.payload.status
            // Object.assign(state.state, action.payload.state)
            // Object.assign(state.cross?.tlsost, action.payload.status)
        },
        setState: (state, action: PayloadAction<StateChangeMsg>) => {
            Object.assign(state, action.payload)
        },
        setConnection: (state, action: PayloadAction<CrossConnectionMsg>) => {
            state.scon = action.payload.scon
            state.eth = action.payload.eth
        },
        setPhaseInfo: (state, action: PayloadAction<PhaseMsg>) => {
            state.techMode = action.payload.techMode
            state.modeRdk = action.payload.modeRdk
            state.dk = action.payload.dk
            state.model = action.payload.model

            // //@ts-ignore
            // if (typeof setPhase !== "undefined") {
            //     //@ts-ignore
            //     setPhase(action.payload.dk.fdk)
            // }
        },
        // setError: (state, action: PayloadAction<CrossBuildMsg>) => {
        // },
        // setClose: (state, action: PayloadAction<CrossBuildMsg>) => {
        // },
    }
})

export const {setInitialData, setEdit, setCross, setState, setConnection, setPhaseInfo} = crossSlice.actions

export const selectCrossInfo = (state: RootState) => state.crossInfo
export const selectDescription = (state: RootState) => state.crossInfo.cross?.description
export const selectPhases = (state: RootState) => state.crossInfo.phases
export const selectIdevice = (state: RootState) => state.crossInfo.cross?.idevice
export const selectModel = (state: RootState) => state.crossInfo.model
export const selectSVG = (state: RootState) => state.crossInfo.svg
export const selectCameras = (state: RootState) => state.crossInfo.cameras
export const selectDeviceElc = (state: RootState) => state.crossInfo.deviceElc
export const selectDeviceError = (state: RootState) => state.crossInfo.deviceError

export default crossSlice.reducer