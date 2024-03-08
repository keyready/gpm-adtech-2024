const deepl = require('deepl-node');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {createWriteStream} = require('fs')
const PlayHTAPI = require("playht");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

dotenv.config({path: './.env'})

const app = express()

const authKey = process.env.DEEPLTOKEN;
const translator = new deepl.Translator(authKey);

PlayHTAPI.init({
    apiKey: process.env.PLAYHT_API_KEY,
    userId: process.env.PLAYHT_USER_ID,
    // defaultVoiceId: 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',
    // defaultVoiceEngine: 'PlayHT2.0',
});

app.use(express.json())
app.use(cors())

app.use(express.static(path.resolve(__dirname, './files/')))

app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, './index.html'))
})

app.post('/translate', async (req, res) => {
    const { valueText, valueSelect } = req.body

    const result = await translator.translateText(valueText, null, valueSelect);

    const fileStream = fs.createWriteStream('./files/hello-playht.mp3');
    const stream = await PlayHTAPI.stream(result.text);
    await stream.pipe(fileStream);

    return res.status(200).json({message: result.text})
})

app.listen(5000, () => {
    console.log('Сервер запущен');
})