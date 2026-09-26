import type { JSX } from "react"
import parrot from "./assets/parrot.png"

export function Header():JSX.Element{
    return(
        <>
            <header>
                <img src={parrot} className="parrot" alt="" />
                <div className="title-container">
                    <h1 className="title">PollyGlot</h1>
                    <h2 className="solgan">Perfect Translation Every Time</h2>
                </div>
            </header>
        </>
    )
}