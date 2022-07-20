import React, {useCallback, useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import {DataGrid, GridColDef, ruRU} from "@mui/x-data-grid";
import {convertDKtoTableRows, pointer} from "../../common/phaseTableLib";
import {PhaseTableRow} from "../../common";
import {useAppSelector} from "../../app/hooks";
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
    {field: "numTU", headerName: "№ фазы ТУ", flex: 2, sortable: false},
    {field: "shiftPR", headerName: "Сдвиг ПР", flex: 2, sortable: false},
    {field: "timePR", headerName: "Т пр.", flex: 2, sortable: false},
    {field: "numTS", headerName: "№ фазы ТС", flex: 2, sortable: false},
    {field: "timeMain", headerName: "Т осн.", flex: 2, sortable: false},
    {field: "timeTS", headerName: "Т фазы ТС", flex: 2, sortable: false},
    {field: "timeTU", headerName: "Т фазы ТУ", flex: 2, sortable: false},
]

let fakeTicker: NodeJS.Timeout

function PhaseTableColumn() {
    const DKs = useAppSelector(selectDKs)

    const [rows, setRows] = useState<PhaseTableRow[]>(useCallback(() => convertDKtoTableRows(DKs), [DKs]))

    useEffect(() => {
        const newRows = [...convertDKtoTableRows(DKs)]
        setRows([...newRows])
        clearInterval(fakeTicker)

        fakeTicker = setInterval(() => {
            const currentRow = newRows[pointer.current] ?? undefined
            if (!currentRow) return
            if (currentRow.numTS === "Пром. такт") {
                currentRow.timePR++
                currentRow.timeTS++
                currentRow.timeTU++
            } else {
                currentRow.timeMain++
                currentRow.timeTS++
                currentRow.timeTU++
            }

            if (newRows.length < 12) {
                setRows([...newRows])
            } else {
                setRows([...newRows.slice(0, pointer.current), currentRow, ...newRows.slice(pointer.current + 1, newRows.length)])
            }
        }, 1000)
    }, [DKs])

    return (
        <div style={{height: "69.58vh", width: "50vw"}}>
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