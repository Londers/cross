import {createAction, createListenerMiddleware, isAnyOf} from "@reduxjs/toolkit";
import {
    ChangeEditMsg,
    CrossBuildMsg, CrossConnectionMsg, CrossUpdateMsg, DispatchMsg,
    IncomingWebSocketMessage,
    OutcomingWebSocketMessage, PhaseMsg, StateChangeMsg
} from "../index";
import {
    setConnection,
    setCross,
    setEdit,
    setInitialData,
    setPhaseInfo,
    setState
} from "../../features/crossSlice";
import {setDispatch} from "../../features/dispatchTableSlice";
import {addDK} from "../../features/phaseTableSlice";
import {pointer} from "../phaseTableLib";
import {RootState} from "../../app/store";

export const wsConnect = createAction<string>("websocket/connect")
export const wsGetMessage = createAction<IncomingWebSocketMessage>('websocket/message')
export const wsSendMessage = createAction<OutcomingWebSocketMessage>('websocket/send')
export const WebSocketListenerMiddleware = createListenerMiddleware()
let ws: WebSocket

WebSocketListenerMiddleware.startListening({
    matcher: isAnyOf(wsConnect, wsGetMessage, wsSendMessage),
    effect: async (action, listenerApi) => {

        if (wsConnect.match(action)) {
            ws = new WebSocket(action.payload)
            ws.onopen = () => console.log("opened")
            ws.onerror = (e) => console.log("error", e)
            ws.onclose = (e) => {
                console.log("closed", e)
                const state = listenerApi.getState() as RootState
                localStorage.setItem("crossPointer", JSON.stringify(pointer))
                localStorage.setItem("crossTable", JSON.stringify(state.phaseTable))

                setTimeout(() => window.location.reload(), 2000)
            }
            ws.onmessage = (e) => listenerApi.dispatch(wsGetMessage(JSON.parse(e.data)))
        } else if (wsSendMessage.match(action)) {
            ws.send(JSON.stringify(action.payload as OutcomingWebSocketMessage))
        } else if (wsGetMessage.match(action)) {
            switch (action.payload.type) {
                case "crossBuild":
                    listenerApi.dispatch(setInitialData(action.payload.data as CrossBuildMsg))
                    break;
                case "changeEdit":
                    listenerApi.dispatch(setEdit(action.payload.data as ChangeEditMsg))
                    break;
                case "dispatch":
                    listenerApi.dispatch(setDispatch(action.payload.data as DispatchMsg))
                    break;
                case "crossUpdate":
                    listenerApi.dispatch(setCross(action.payload.data as CrossUpdateMsg))
                    break;
                case "stateChange":
                    listenerApi.dispatch(setState(action.payload.data as StateChangeMsg))
                    break;
                case "crossConnection":
                    listenerApi.dispatch(setConnection(action.payload.data as CrossConnectionMsg))
                    break;
                case "phase":
                    listenerApi.dispatch(setPhaseInfo(action.payload.data as PhaseMsg))
                    listenerApi.dispatch(addDK(action.payload.data as PhaseMsg))
                    break;
                case "error":
                    if ("message" in action.payload.data) {
                        alert("Произошла ошибка. Обратитесь к администратору")
                        console.log("error ", action.payload.data)
                    }
                    break;
                case "close":
                    ws.close(1000)
                    window.close()
                    break;
                default:
                    console.log("type not found:", action.payload)
                    break;
            }
        }
    },
})