import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectIdevice, selectPhases} from "../crossSlice";
import {Button} from "@mui/material";
import {PhaseCommandType} from "../../common/tools";
import {wsSendMessage} from "../../common/Middlewares/WebSocketMiddleware";

function ButtonsColumn() {
    const phases = useAppSelector(selectPhases)
    const idevice = useAppSelector(selectIdevice)
    const dispatch = useAppDispatch()

    const dispatchToDevice = (param: number) => {
        dispatch(wsSendMessage({type: "dispatch", cmd: PhaseCommandType, id: idevice, param}))
    }

    return (
        <>
            {phases.map((phase, index) =>
                <Button variant="outlined" size="large" onClick={() => dispatchToDevice(phase)} key={index}>
                    {phase}
                </Button>
            )}
            <Button variant="outlined" size="large" onClick={() => dispatchToDevice(10)}>
                ЖМ
            </Button>
            <Button variant="outlined" size="large" onClick={() => dispatchToDevice(11)}>
                ОС
            </Button>
            <Button variant="outlined" size="large" onClick={() => dispatchToDevice(0)}>
                ЛР
            </Button>
            <Button variant="outlined" size="large" onClick={() => dispatchToDevice(9)}>
                КУ
            </Button>
            <Button variant="outlined" size="small">
                Открыть журнал
            </Button>
        </>
    )
}

export default ButtonsColumn