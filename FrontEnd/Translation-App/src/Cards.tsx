import type { JSX } from "react";
import { Header } from "./Header";
import { MainComponent } from "./MainComponent"
export function Card():JSX.Element{
    return(
        <>
            <Header />
            <MainComponent />
        </>
    )
}