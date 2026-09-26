import type { JSX } from "react";
import  japaneseFlag from "./assets/jpn-flag.png"
import  frenchFlag from "./assets/fr-flag.png"
import  spanishFlag from "./assets/sp-flag.png"
import { useState , useRef } from "react";

type TranslateResponse = { translation: string };

export function MainComponent():JSX.Element{

    const [state, setState] = useState<"select" | "result">("select");

    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    function toggleState(): void {
        setState(prev => prev === "select" ? "result" : "select");
    }

    async function sendApi():Promise<void> {
        try {
             const response = await fetch("http://localhost:3001/api/translate" , {
            method:"POST" ,
            headers: {
                "Content-Type" : "application/json" 
            },
            body: JSON.stringify({text : textAreaRef.current?.value})
        })
        const data:TranslateResponse = await response.json()
        console.log(data)
        } catch (error) {
            console.log(error)
        }
        
       
    }
    return(
        <main>
            <div className="top-container">
                <h1 className="main-h1">Text to translate 👇</h1>
                <textarea name="chat" id="chat" ref={textAreaRef} placeholder="How are you?"></textarea>
            </div>
            
            <div className="languages bottom-container">
                <div className="language-selection">
                {state == "select" ? "Select language 👇" : "Your translation 👇"}
                </div>
                {state == "select" ? 
                    <>
                        <div className="language-options">
                            <label className="lang-radio">
                                <input type="radio" defaultChecked name="radio" />
                                <span className="checkmark">
                                </span>
                                Arabic
                                    <img src={frenchFlag} alt="" />
                            </label>
                            <label className="lang-radio">
                                <span className="checkmark">
                                </span>
                                <input type="radio" name="radio" />
                                Spainsh
                                    <img src={spanishFlag} alt="" />
                            </label>
                            <label className="lang-radio">
                                <span className="checkmark">
                                </span>
                                <input type="radio" name="radio" />
                                Japanese
                                    <img src={japaneseFlag} alt="" />
                            </label>
                        </div>  
                        
                        <div className="btn-container">
                            <button className="translate-btn" id="translate" onClick={() => { toggleState(); sendApi(); }}>Translate</button>
                        </div>
                    </> :
                    <>
                        <div className="translation-textarea">
                            <textarea name="translation" id=""   placeholder="Your Translation"></textarea>
                        </div>
                        <div className="btn-container">
                            <button className="translate-btn" onClick={toggleState}>Start Over</button>
                        </div>
                    </>
                }
                
            </div>
        </main>
    )
}