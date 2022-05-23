import React, {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";
import {convertDKtoTableRows, pointer} from "../../common/phaseTableLib";
import {PhaseTableRow} from "../../common";
import {useAppSelector} from "../../app/hooks";
import {selectPhases} from "../crossSlice";
import {selectDKs} from "../phaseTableSlice";

const theme = createTheme(
    {
        palette: {
            primary: {main: "#1976d2"},
        },
    },
    ruRU,
);

const columns: GridColDef[] = [
    {field: "numTU", headerName: "№ фазы ТУ", flex: 2, sortable: false },
    {field: "shiftPR", headerName: "Сдвиг ПР", flex: 2, sortable: false },
    {field: "timePR", headerName: "Т пр.", flex: 2, sortable: false },
    {field: "numTS", headerName: "№ фазы ТС", flex: 2, sortable: false },
    {field: "timeMain", headerName: "Т осн.", flex: 2, sortable: false },
    {field: "timeTS", headerName: "Т фазы ТС", flex: 2, sortable: false },
    {field: "timeTU", headerName: "Т фазы ТУ", flex: 2, sortable: false },
]

function PhaseTableColumn() {
    const DKs = useAppSelector(selectDKs)

    const [rows, setRows] = useState<PhaseTableRow[]>(convertDKtoTableRows(DKs))

    useEffect(() => {
        setRows(convertDKtoTableRows(DKs))
    }, [DKs])

    return (
        <div style={{height: "70vh"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    selectionModel={pointer.current}
                    // components={{
                    //     Toolbar: CustomTableToolbar,
                    // }}
                    disableColumnFilter
                    disableSelectionOnClick
                    rows={rows}
                    columns={columns}
                    // selectionModel={selection}
                    // onSelectionModelChange={handleCrossSelect}
                    hideFooter
                />
            </ThemeProvider>
        </div>
    )
}

export default PhaseTableColumn