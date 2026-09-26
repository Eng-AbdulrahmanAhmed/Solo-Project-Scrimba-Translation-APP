import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors());
app.post("/api/translate" , async(req ,res) => {
    const { text } = req.body
    console.log(text)
    res.json(`You Sent me This Translation ${text}`)
})

const PORT = process.env.PORT || 3001;
app.listen(PORT , () => {
    console.log(`Listenin On Port ${PORT}`);
})