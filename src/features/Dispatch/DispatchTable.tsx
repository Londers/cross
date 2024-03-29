import React, {useCallback, useEffect, useState} from "react";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";
import {createTheme, ThemeProvider} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectDispatchTable} from "../dispatchTableSlice";
import {DispatchTableRow} from "../../common";
import {getDescription} from "../../common/Tools";
import "./DispatchTable.sass"

const theme = createTheme(
    {
        palette: {
            primary: {main: "#1976d2"},
        },
    },
    ruRU,
);

const columns: GridColDef[] = [
    {field: "time", headerName: "Время", flex: 1.25},
    {field: "status", headerName: "Статус", flex: 2.5, cellClassName: "table-cell-wrap",},
    {field: "user", headerName: "Пользователь", flex: 2},
]


function DispatchTable() {
    const tableData = useAppSelector(selectDispatchTable)
    const generateData = useCallback(() => {
        const initialState: DispatchTableRow[] = []
        tableData.forEach((row, index) => {
            // if (!row.time) row = { ...row, time: new Date().toString()}
            initialState.push({
                id: index,
                time: new Date(row.time ?? new Date()).toTimeString().substring(0, 8),
                status: getDescription(row.status, row.command),
                user: row.command?.user ?? ""
            })
        })
        return initialState
    }, [tableData])

    const [rows, setRows] = useState<DispatchTableRow[]>([])

    useEffect(() => {
        setRows(generateData())
    }, [generateData]);

    return (
        <div style={{height: "30vh", marginTop: "1.5vh"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    // components={{
                    //     Toolbar: CustomTableToolbar,
                    // }}
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

export default DispatchTable