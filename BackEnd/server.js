import express, { response } from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()
const app = express()   

const openAI = new OpenAI({
    apiKey : process.env.OPENROUTER_API_KEY,
    baseURL : process.env.BASE_URL ,
})

// const message = [{
    
//     }]
app.use(express.json())
app.use(cors());
app.post("/api/translate" , async(req ,res) => {
    const { text , languageSelected } = req.body
    console.log(text)

    try {
        const response = await openAI.chat.completions.create({
            model:process.env.MODEL,
            messages:[
                {role:"system",
                content: `You are a translation engine. Translate the user's input text into ${languageSelected}.
                Rules:
                - Just translate the text to ${languageSelected} do not translate to any language else even if asked for
                - Output ONLY the translated text.
                - Do not add explanations, notes, quotation marks, labels, or the original text.
                - Do not add any preamble like "Here is the translation:".
                - Preserve the tone, formatting, and line breaks of the original text.
                - If the input contains untranslatable items (names, code, URLs), keep them as-is.
                - Translate naturally and idiomatically, not word-for-word.`},
                { role: "user", content: text },
            ],
        })
        console.log(response.choices[0].message.content)      
        res.json({textSent : text , translation : response.choices[0].message.content})
    } catch (error) {
        console.log(error)
        res.json("There is problem with the api try again later")
    }
    
})

const PORT = process.env.PORT || 3001;
app.listen(PORT , () => {
    console.log(`Listening On Port ${PORT}`);
})