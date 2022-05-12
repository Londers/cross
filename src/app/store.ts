import {configureStore} from "@reduxjs/toolkit";
import {crossSlice} from "../features/crossSlice";
import {WebSocketListenerMiddleware} from "../common/Middlewares/WebSocketMiddleware";


export const store = configureStore({
    reducer: {
        crossInfo: crossSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(WebSocketListenerMiddleware.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// export type AccountState = ReturnType<typeof accountSlice.reducer>
export type AppDispatch = typeof store.dispatch