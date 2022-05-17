import React, {ChangeEvent} from "react";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme(
    {
        palette: {
            primary: {main: "#1976d2"},
        },
    },
    ruRU,
);

const columns: GridColDef[] = [
    {field: "time", headerName: "Время", flex: 1},
    {field: "status", headerName: "Статус", flex: 2.5},
    {field: "user", headerName: "Пользователь", flex: 2},
]


function DispatchTable() {

    const filteredRows = [{id: 0, time: "1", status: "1", user: "Admin"},{id: 1, time: "0", status: "0", user: "Admin"},{id: 2, time: "0", status: "0", user: "Admin"},{id: 3, time: "0", status: "0", user: "Admin"},{id: 4, time: "0", status: "0", user: "Admin"},]

    return (
        <div style={{height: "30vh", border: "2px solid red"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    // components={{
                    //     Toolbar: CustomTableToolbar,
                    // }}
                    rows={filteredRows}
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