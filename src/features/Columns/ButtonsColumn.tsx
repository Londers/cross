import React from "react";
import {useAppSelector} from "../../app/hooks";
import {selectPhases} from "../crossSlice";
import {Button} from "@mui/material";

function ButtonsColumn() {
    const phases = useAppSelector(selectPhases)

    const dispatchToDevice = (command: number) => {
        console.log(command)
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