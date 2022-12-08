import React from "react";
import ImagePlaceholder from "../../common/ImagePlaceholder";
import {useAppSelector} from "../../app/hooks";
import {selectCrossInfo} from "../crossSlice";
import DispatchTable from "../Dispatch/DispatchTable";
import {Button} from "@mui/material";

function ImageColumn() {
    const crossInfo = useAppSelector(selectCrossInfo)

    const handleArmOpen = () => {
        window.open(window.location.origin + window.location.pathname + '/control' + window.location.search)
    }

    return (
        <>
            <ImagePlaceholder/>
            <p>{crossInfo.dk?.edk === 1 ? "ПЕРЕХОД" : crossInfo.modeRdk}</p>
            <p>Статус: {crossInfo.cross?.tlsost.description}</p>
            <p>Технология: {crossInfo.techMode}</p>
            <Button variant="outlined" onClick={handleArmOpen}>Открыть привязку</Button>
            <DispatchTable/>
        </>
    )
}

export default ImageColumn