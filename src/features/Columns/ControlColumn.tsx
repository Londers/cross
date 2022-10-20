import React from "react";
import {Grid, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectCrossInfo, selectDeviceElc, selectDeviceError, selectModel} from "../crossSlice";
import {wsSendMessage} from "../../common/Middlewares/WebSocketMiddleware";
import {decodePhase} from "../../common/phaseTableLib";
import {checkError, checkMalfunction, switchArrayTypeFromDevice} from "../../common/Tools";

function ControlColumn() {
    const cross = useAppSelector(selectCrossInfo)
    const model = useAppSelector(selectModel)

    const dispatch = useAppDispatch()
    const dispatchControl = (cmd: number, param: number) => {
        dispatch(wsSendMessage({type: "dispatch", id: cross.cross?.idevice, cmd, param}))
    }
    const deviceElc = useAppSelector(selectDeviceElc)
    const deviceError = useAppSelector(selectDeviceError)

    const handlePkChange = (event: SelectChangeEvent<number>) => dispatchControl(5, Number(event.target.value))
    const handleSkChange = (event: SelectChangeEvent<number>) => dispatchControl(6, Number(event.target.value))
    const handleNkChange = (event: SelectChangeEvent<number>) => dispatchControl(7, Number(event.target.value))

    const findUsedWeekSets = () => {
        const usedWeekSets = new Set<number>()
        usedWeekSets.add(0)
        cross.state?.arrays.MonthSets.monthset.forEach(month => {
            month.days.forEach(weekSet => usedWeekSets.add(weekSet))
        })
        return Array.from(usedWeekSets)
    }
    const weekSets: number[] = findUsedWeekSets()

    const findUsedDaySets = () => {
        const usedDaySets = new Set<number>()
        usedDaySets.add(0)
        weekSets.forEach(weekSet => {
                if (weekSet !== 0) {
                    cross.state?.arrays.WeekSets.wsets[(weekSet as number) - 1]?.days.forEach(
                        week => {
                            usedDaySets.add(week)
                        }
                    )
                }
            }
        )
        return Array.from(usedDaySets)
    }
    const daySets: number[] = findUsedDaySets()

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item sx={{marginTop: "2vh", width: "5vw"}}>
                <Select
                    labelId="pk-select-label"
                    id="pk-select"
                    value={cross.state?.pk ?? 0}
                    onChange={handlePkChange}
                >
                    {
                        Array.from({length: 13}).map((num, index) =>
                            <MenuItem value={index} key={index}>{index === 0 ? index : `ПК ${index}`}</MenuItem>
                        )
                    }
                </Select>
            </Grid>
            <Grid item sx={{marginTop: "2vh", width: "5vw"}}>
                <Select
                    labelId="pk-select-label"
                    id="pk-select"
                    value={cross.state?.ck ?? 0}
                    onChange={handleSkChange}
                >
                    {
                        daySets.map(set =>
                            <MenuItem value={set} key={set}>{set === 0 ? set : `СК ${set}`}</MenuItem>
                        )
                    }
                </Select>
            </Grid>
            <Grid item sx={{marginTop: "2vh", width: "5vw"}}>
                <Select
                    labelId="pk-select-label"
                    id="pk-select"
                    value={cross.state?.nk ?? 0}
                    onChange={handleNkChange}
                >
                    {
                        weekSets.map(set =>
                            <MenuItem value={set} key={set}>{set === 0 ? set : `НК ${set}`}</MenuItem>
                        )
                    }
                </Select>
            </Grid>
            <Grid item sx={{marginTop: "2vh"}}>
                Фаза: {decodePhase(cross.dk?.fdk ?? -1)}
            </Grid>
            <Grid item sx={{marginTop: "2vh"}}>
                {switchArrayTypeFromDevice(model)}
            </Grid>
            <Grid item sx={{marginTop: "2vh"}}>
                {cross.scon ? (cross.eth ? "LAN" : "GPRS") : ""}
            </Grid>
            {(deviceElc !== 0) && <Grid item sx={{marginTop: "2vh"}}>
                {checkError(deviceError, deviceElc, checkMalfunction(deviceError) !== "")}
            </Grid>}
        </Grid>
    )
}

export default ControlColumn