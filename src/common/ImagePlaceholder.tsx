import React, {useEffect} from "react";
import {useAppSelector} from "../app/hooks";
import {selectCrossInfo, selectSVG} from "../features/crossSlice";

import InnerHTML from 'dangerously-set-html-content'

function ImagePlaceholder() {
    const svg = useAppSelector(selectSVG)?.replace("let currentPhase", "var currentPhase")
    const script = svg?.slice(svg?.indexOf("<script>"), svg?.indexOf("</script>") + 9)

    const phase = useAppSelector(selectCrossInfo).dk?.fdk

    useEffect(() => {
        //@ts-ignore
        if (typeof setPhase !== "undefined") {
            try {
                // @ts-ignore боль, костыль из-за onload в картике
                modever = 0; currentPhase = 0; setVisualMode(modever); dropLight(); dropDirect(); dropLocale();
            } catch (e) {
                console.log(e)
            }
            if (phase) {
                try {
                    //@ts-ignore
                    setPhase(phase)
                } catch (err) {
                    console.log(err)
                    alert("Ошибка: отсутсвует картинка фазы: " + phase)
                }
            }
        }
    }, [phase])

    return (
        <div style={{height: "450px", width: "450px"}}>
            {
                //@ts-ignore
                svg ? <InnerHTML html={svg} src={svg}/> : <div/>
            }
            {
                //@ts-ignore
                svg ? <InnerHTML html={script} src={script}/> : <div/>
            }
        </div>
    )
}

export default ImagePlaceholder