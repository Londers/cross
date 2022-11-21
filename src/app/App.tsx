import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch} from "./hooks";
import {wsConnect} from "../common/Middlewares/WebSocketMiddleware";
import MainScreen from "../features/MainScreen";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            dispatch(wsConnect("wss://192.168.115.134:4443/user/Admin/crossW?Region=1&Area=1&ID=11"))
            // dispatch(wsConnect("wss://192.168.0.101:4443/user/Admin/crossW?Region=1&Area=1&ID=7"))
        } else {
            dispatch(wsConnect(`wss://${window.location.host}/user/${localStorage.getItem("login")}/crossW${window.location.search}`))
        }
    }, [dispatch])

    return (
        <div className="App">
            <MainScreen/>
        </div>
    );
}

export default App;