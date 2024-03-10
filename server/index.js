const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const { AssemblyAI } = require('assemblyai');
const ytdl = require('ytdl-core');
const dotenv = require('dotenv');
const deepl = require('deepl-node');
const fs = require('fs');
const PlayHTAPI = require('playht');

const ffmpeg = require('@ffmpeg-installer/ffmpeg');
const extractAudio = require('ffmpeg-extract-audio');

const ffmpegPath = ffmpeg.path;
const ffmpegFluent = require('fluent-ffmpeg');

ffmpegFluent.setFfmpegPath(ffmpegPath);

dotenv.config({ path: '../.env' });
const client = new AssemblyAI({
    apiKey: 'd8d36f62fd7644038b1b3495e061387a',
});
PlayHTAPI.init({
    apiKey: process.env.PLAYHT_API_KEY,
    userId: process.env.PLAYHT_USER_ID,
});

const authKey = process.env.DEEPLTOKEN;

const app = express();
const translator = new deepl.Translator(authKey);

app.use(express.json());
app.use(cors());

app.post('/user/yandex-auth', async (req, res) => {
    const { code } = req.body;

    const user = {
        id: 1,
        login: 'keyready',
        mail: 'dalls13@bk.ru',
    };

    return res.status(200).json(user);
});

app.post('/video/upload', async (req, res) => {
    const { url } = req.body;

    setTimeout(() => res.status(200).json({}), 3000);

    // const date = Date.now().toString();
    // fs.mkdirSync(path.resolve(__dirname, `./files/${date}`), { recursive: true });
    //
    // const outputPathVideo = path.resolve(__dirname, `files/${date}/video.mp4`);
    // const outputPathAudio = path.resolve(__dirname, `files/${date}/audio.mp3`);
    // const outputPathTextOriginal = path.resolve(__dirname, `files/${date}/textOr.txt`);
    // const outputPathTextTranslated = path.resolve(__dirname, `files/${date}/textTr.txt`);
    // const videoURL = url;
    //
    // ytdl(videoURL)
    //     .pipe(fs.createWriteStream(outputPathVideo))
    //     .on('finish', async () => {
    //         console.log('Загрузка завершена');
    //
    //         await extractAudio({
    //             input: outputPathVideo, // Путь к вашему видеофайлу
    //             output: outputPathAudio, // Имя выходного файла аудио
    //         });
    //
    //         console.log('Аудио успешно извлечено');
    //
    //         const config = {
    //             audio_url: outputPathAudio,
    //             language_code: 'ru',
    //         };
    //
    //         const transcript = await client.transcripts.create(config);
    //         fs.writeFile(outputPathTextOriginal, transcript.text, (err) => {
    //             if (err) {
    //                 console.error('Ошибка при сохранении файла:', err);
    //             } else {
    //                 console.log('Текст успешно сохранен в файл');
    //             }
    //         });
    //
    //         const result = await translator.translateText(transcript.text, null, 'en-us');
    //         fs.writeFile(outputPathTextTranslated, result.text, (err) => {
    //             if (err) {
    //                 console.error('Ошибка при сохранении файла:', err);
    //             } else {
    //                 console.log('Текст успешно сохранен в файл');
    //             }
    //         });
    //
    //         const fileStream = fs.createWriteStream(outputPathAudio);
    //         const stream = await PlayHTAPI.stream(result.text);
    //         await stream.pipe(fileStream);
    //     });
    //
    // return res.status(200).json({
    //     subtitles: [
    //         {
    //             text: 'Accusantium aliquam consequuntur delectus dignissimos ea enim eum eveniet ipsa laborum, magni minima nesciunt nobis nulla, odit quod sequi suscipit, tempore veritatis voluptates. Delectus facilis obcaecati officiis perferendis.',
    //             startAt: '00:00',
    //             endAt: '00:13',
    //         },
    //         {
    //             text: 'Accusantium aliquam consequuntur delectus dignissimos ea enim eum eveniet ipsa laborum, magni minima nesciunt nobis nulla, odit quod sequi suscipit, tempore veritatis voluptates. Delectus ex facilis obcaecati officiis perferendis.',
    //             startAt: '00:13',
    //             endAt: '00:21',
    //         },
    //     ],
    // });
});

app.get('/history/fetch_all', (req, res) =>
    res.status(200).json([
        { id: 1, title: 'БДСМ с карликами в 4К', url: 'https://pornhub.com/bdsm-s-karlikami-v-4k' },
        { id: 2, title: 'БДСМ с карликами в 4К', url: 'https://pornhub.com/bdsm-s-karlikami-v-4k' },
        { id: 3, title: 'БДСМ с карликами в 4К', url: 'https://pornhub.com/bdsm-s-karlikami-v-4k' },
    ]),
);

app.listen(5000, () => {
    console.log('Сервер запущен');
});
