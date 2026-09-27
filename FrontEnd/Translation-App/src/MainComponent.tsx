import type { JSX } from "react";
import  japaneseFlag from "./assets/jpn-flag.png"
import  frenchFlag from "./assets/fr-flag.png"
import  spanishFlag from "./assets/sp-flag.png"
import { useState , useRef } from "react";
// import { marked } from "marked";
// import DOMPurify from "dompurify";

type TranslateResponse = { translation: string };

export function MainComponent():JSX.Element{

    const [state, setState] = useState<"select" | "result">("select");
    const [language , setLanguage] = useState<string>('French')
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [translationText , setTranslationText] = useState("")

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
            body: JSON.stringify({text : textAreaRef.current?.value , languageSelected : language })
        })
        const data:TranslateResponse = await response.json()
        console.log(data)
        setTranslationText(data.translation)
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
                                <input type="radio" defaultChecked name="radio" onChange={(e)=> setLanguage(e.target.value)} value="french"/>
                                <span className="checkmark">
                                </span>
                                French
                                    <img src={frenchFlag} alt="" />
                            </label>
                            <label className="lang-radio">
                                <span className="checkmark">
                                </span>
                                <input type="radio" name="radio" onChange={(e)=> setLanguage(e.target.value)} value="spanish"/>
                                Spanish
                                    <img src={spanishFlag} alt="" />
                            </label>
                            <label className="lang-radio">
                                <span className="checkmark">
                                </span>
                                <input type="radio" onChange={(e)=> setLanguage(e.target.value)} name="radio" value="japanese"/>
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
                            <textarea name="translation" id="translation-areatext" value={translationText} placeholder="Your Translation"></textarea>
                        </div>
                        <div className="btn-container">
                            <button className="translate-btn" onClick={()=>{toggleState();setTranslationText(" ") }}>Start Over</button>
                        </div>
                    </>
                }
            </div>
        </main>
    )
}