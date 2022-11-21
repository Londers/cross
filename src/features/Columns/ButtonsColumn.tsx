import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCameras, selectCrossInfo, selectIdevice, selectPhases} from "../crossSlice";
import {Box, Button} from "@mui/material";
import {PhaseCommandType} from "../../common/Tools";
import {wsSendMessage} from "../../common/Middlewares/WebSocketMiddleware";
import "./ButtonsColumn.sass"

let phaseSender: NodeJS.Timer | undefined

function ButtonsColumn() {
    const cross = useAppSelector(selectCrossInfo).cross
    const phases = useAppSelector(selectPhases)
    const idevice = useAppSelector(selectIdevice)
    const dispatch = useAppDispatch()

    const [currentButton, setCurrentButton] = useState<(EventTarget & HTMLAnchorElement) | (EventTarget & HTMLButtonElement) | undefined>()
    const cameras = useAppSelector(selectCameras)

    const dispatchSpecialPhaseToDevice = (param: number) => {
        if (phaseSender) {
            currentButton?.classList.remove("phaseRepeat")
            clearInterval(phaseSender)
            phaseSender = undefined
        }
        dispatch(wsSendMessage({type: "dispatch", cmd: PhaseCommandType, id: idevice, param}))
    }

    const dispatchPhaseToDevice = (param: number, e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
        currentButton?.classList.remove("phaseRepeat")
        setCurrentButton(undefined)
        clearInterval(phaseSender)
        phaseSender = undefined
        if (currentButton !== e.currentTarget) {
            e.currentTarget.classList.add("phaseRepeat")
            setCurrentButton(e.currentTarget)
            dispatch(wsSendMessage({type: "dispatch", cmd: PhaseCommandType, id: idevice, param}))
            phaseSender = setInterval(
                () => dispatch(wsSendMessage({type: "dispatch", cmd: PhaseCommandType, id: idevice, param})),
                60000
            )
        }
    }

    const openLogs = () => {
        if (cross) {
            localStorage.setItem('ID', cross.ID.toString())
            localStorage.setItem('area', cross.area.num)
            localStorage.setItem('region', cross.region.num)
            localStorage.setItem('description', cross.description)
            window.open(window.location.origin + '/user/' + localStorage.getItem('login') + '/deviceLog')
        }
    }

    return (
        <Box>
            {phases.map((phase, index) =>
                <Button className="phase" variant="outlined" size="large"
                        onClick={(e) => dispatchPhaseToDevice(phase, e)}
                        key={index}>
                    {phase}
                </Button>
            )}
            <Button className="phase" variant="outlined" size="large" onClick={() => dispatchSpecialPhaseToDevice(10)}>
                ЖМ
            </Button>
            <Button className="phase" variant="outlined" size="large" onClick={() => dispatchSpecialPhaseToDevice(11)}>
                ОС
            </Button>
            <Button className="phase" variant="outlined" size="large" onClick={() => dispatchSpecialPhaseToDevice(0)}>
                ЛР
            </Button>
            <Button className="phase" variant="outlined" size="large" onClick={() => dispatchSpecialPhaseToDevice(9)}>
                КУ
            </Button>
            <Button className="phase" variant="outlined" size="small" onClick={openLogs}
                    style={{width: "50%", fontSize: "10px"}}>
                Открыть журнал
            </Button>
            {cameras && <Button className="phase" variant="outlined" size="small" onClick={() => window.open(window.location.href.replace("cross?", "cameras?"))}
                     style={{width: "50%", fontSize: "10px"}}>
                Открыть ДТ
            </Button>}
        </Box>
    )
}

export default ButtonsColumn