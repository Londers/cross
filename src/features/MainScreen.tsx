import React, {useEffect} from "react";
import {useAppSelector} from "../app/hooks";
import {selectDescription} from "./crossSlice";
import ButtonsColumn from "./Columns/ButtonsColumn";
import {Box, Grid} from "@mui/material";
import ImageColumn from "./Columns/ImageColumn";
import ControlColumn from "./Columns/ControlColumn";
import PhaseTableColumn from "./Columns/PhaseTableColumn";

function MainScreen() {
    const description = useAppSelector(selectDescription)

    useEffect(() => {
        document.title = description ?? "Перекрёсток"
    }, [description])

    return (
        <>
            <h3 style={{width: "100%"}}>{description}</h3>
            <Box flexGrow={1}
                 style={{width: "calc(100vw - 4px)", height: "calc(100vh - 4em)"}}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="stretch"
                    style={{height: "100%"}}
                    columns={7.5}
                >
                    <Grid item xs={0.5}>
                        <ButtonsColumn/>
                    </Grid>
                    <Grid item xs="auto">
                        <ImageColumn/>
                    </Grid>
                    <Grid item xs={1}>
                        <ControlColumn/>
                    </Grid>
                    <Grid item xs={4}>
                        <PhaseTableColumn/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default MainScreen