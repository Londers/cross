import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";

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

function PhaseTableColumn() {
    return (
        <div style={{height: "30vh", border: "2px solid red"}}>
            <ThemeProvider theme={theme}>
                <DataGrid
                    // components={{
                    //     Toolbar: CustomTableToolbar,
                    // }}
                    rows={[]}
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