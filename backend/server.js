import { Configuration,OpenAIApi } from "openai";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(bodyParser.json());
app.use(cors());


const configuration = new Configuration({
    organization:"", 
    apiKey:""  

});

const openai =new OpenAIApi(configuration);

app.post("/", async (req, res)=>{
    const {chats} = req.body;
    const result =await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages: [
            {
                role:"system",
                content:"You have a friendly chat with people"
            },
            ...chats
        ],
    });
    res.json(
        {
            output: result.data.choices[0].message
        }
    )
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})