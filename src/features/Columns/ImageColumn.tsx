import React from "react";
import ImagePlaceholder from "../../common/ImagePlaceholder";
import {useAppSelector} from "../../app/hooks";
import {selectCrossInfo} from "../crossSlice";
import DispatchTable from "../../common/DispatchTable";

function ImageColumn() {
    const crossInfo = useAppSelector(selectCrossInfo)

    return (
        <>
            <ImagePlaceholder/>
            <p>{crossInfo.modeRdk}</p>
            <p>Статус: {crossInfo.cross?.tlsost.description}</p>
            <p>Технология: {crossInfo.techMode}</p>
            <p>Открыть привязку</p>
            <DispatchTable/>
        </>
    )
}

export default ImageColumn