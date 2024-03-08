const deepl = require('deepl-node');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

const app = express()

const authKey = process.env.DEEPLTOKEN;
const translator = new deepl.Translator(authKey);


app.use(express.json())
app.use(cors())

app.post('/translate', async (req, res) => {
    const { valueText, valueSelect } = req.body

    const result = await translator.translateText(valueText, null, valueSelect);
    
    return res.status(200).json({message: result.text})
})

app.listen(5000, () => {
    console.log('Сервер запущен');
})