import {Dk, PhaseTableRow} from "./index";

let tableRows: PhaseTableRow[] = []

export const decodePhase = (phase: number): number | string => {
    switch (phase) {
        case 0:
            return "ЛР"
        case 9:
            return "Пром. такт"
        case 10:
        case 14:
            return "ЖМ"
        case 11:
        case 15:
            return "ОС"
        case 12:
            return "КК"
        default:
            return phase
    }
}

export const maxTableSize = 12;

class Pointer {
    private _previous = -1
    private _current = 0
    private _next = 1

    increment() {
        this._previous++
        this._current++
        this._next++
        if (this._previous === maxTableSize) this._previous = 0
        if (this._current === maxTableSize) this._current = 0
        if (this._next === maxTableSize) this._next = 0
    }

    decrement() {
        this._previous--
        this._current--
        this._next--
        if (this._previous === -1) this._previous = maxTableSize
        if (this._current === -1) this._current = maxTableSize
        if (this._next === -1) this._next = maxTableSize
    }

    get previous(): number {
        return this._previous;
    }

    get current(): number {
        return this._current;
    }

    get next(): number {
        return this._next;
    }
}

export let pointer = new Pointer()

const calculateTimeTU = (shiftPR: number): number => {
    if (tableRows[pointer.previous].numTU === "ЛР") {
        return 0
    } else {
        return (tableRows[pointer.previous].timeTS + tableRows[pointer.previous].shiftPR) - shiftPR
    }
}

export const convertDKtoTableRows = (dks: Dk[]): (PhaseTableRow[]) => {
    const dk = dks[pointer.current]
    if (!dk) return tableRows
    if (decodePhase(dk.fdk) === tableRows[pointer.previous]?.numTS) {
        if (dk.fdk === 9) {
            pointer.decrement()
        }
        return tableRows
    }
    let newRow: PhaseTableRow
    const tableRowsCopy: PhaseTableRow[] = Object.assign([], tableRows)

    if (dk.fdk >= 9) {
        const numTU = decodePhase(dk.ftudk);
        const shiftPR = dk.tdk;
        const timePR = dk.fdk === 9 ? 0 : dk.ttcdk;
        const numTS = decodePhase(dk.fdk);
        const timeMain = dk.fdk === 9 ? 0 : dk.tdk - (tableRowsCopy[pointer.previous]?.shiftPR ?? 0)
        const timeTS = 0
        const timeTU = 0

        if (tableRowsCopy[pointer.previous]) {
            tableRowsCopy[pointer.previous].timeMain = dk.ttcdk
            tableRowsCopy[pointer.previous].timeTS = dk.ttcdk + tableRowsCopy[pointer.previous].timePR
            tableRowsCopy[pointer.previous].timeTU = calculateTimeTU(shiftPR)
        }

        newRow = {
            id: pointer.current,
            numTU,
            shiftPR,
            timePR,
            numTS,
            timeMain,
            timeTS,
            timeTU
        }
    } else {
        const numTU = decodePhase(dks[pointer.current].ftudk ?? dk.ftudk)
        const shiftPR = tableRowsCopy[pointer.current].shiftPR ?? dk.tdk
        const timePR = dk.ttcdk
        const numTS = decodePhase(dk.fdk)
        const timeMain = tableRowsCopy[pointer.current].timeMain
        const timeTS = timePR + timeMain
        const timeTU = shiftPR + timeTS

        if ((tableRowsCopy[pointer.previous]) && (tableRowsCopy[pointer.current].numTS === "Пром. такт") && (typeof numTU === "number")) {
            tableRowsCopy[pointer.previous].timeTU = (tableRowsCopy[pointer.previous].timeTS + tableRowsCopy[pointer.previous].shiftPR) - shiftPR
        }

        newRow = {
            id: pointer.current,
            numTU,
            shiftPR,
            timePR,
            numTS,
            timeMain,
            timeTS,
            timeTU
        }
    }
    if (tableRowsCopy[pointer.current]?.numTS === "КК") {
        tableRowsCopy.splice(pointer.next, 1, newRow)
        pointer.increment()
    } else {
        tableRowsCopy.splice(pointer.current, 1, newRow)
    }
    tableRows = Object.assign([], tableRowsCopy)
    return tableRows
}
