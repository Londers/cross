import React from "react";
import {useAppSelector} from "../app/hooks";
import {selectSVG} from "../features/crossSlice";

import InnerHTML from 'dangerously-set-html-content'

function ImagePlaceholder() {
    const svg = useAppSelector(selectSVG)

    return (
        // <div style={{height: "450px", width: "450px", border: "2px black solid"}}>
        //@ts-ignore
        svg ? <InnerHTML html={svg} src={svg}/> : <div/>
        // </div>
    )
}

export default ImagePlaceholder