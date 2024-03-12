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
const submitVideoForTranscription = require('./api/getSubtitles');

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

app.use('/files', express.static(path.resolve(__dirname, '../files/')));

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

    const date = Date.now();
    fs.mkdirSync(path.resolve(__dirname, `../files/${date.toString()}`), { recursive: true });

    const outputPathVideo = path.resolve(__dirname, `../files/${date.toString()}/video.mp4`);
    const outputPathAudio = path.resolve(__dirname, `../files/${date.toString()}/audio.mp3`);
    const outputPathTextOriginal = path.resolve(
        __dirname,
        `../files/${date.toString()}/textOr.json`,
    );
    const outputPathTextTranslated = path.resolve(
        __dirname,
        `../files/${date.toString()}/textTr.txt`,
    );
    const videoURL = url;

    console.log(`>\t|\tОбработка видео запущена\t${date.toString()}`);

    ytdl(videoURL)
        .pipe(fs.createWriteStream(outputPathVideo))
        .on('finish', async () => {
            console.log(
                `<\t|\tЗагрузка завершена\t\t+ ${((Date.now() - date) % 60000).toFixed(2)} c`,
            );

            await extractAudio({
                input: outputPathVideo, // Путь к вашему видеофайлу
                output: outputPathAudio, // Имя выходного файла аудио
            });
            console.log(
                `<\t|\tАудио успешно извлечено\t\t+ ${((Date.now() - date) % 60000).toFixed(2)} c`,
            );

            console.log(
                `>\t|\tНачат процесс транскрибации\t+ ${((Date.now() - date) % 60000).toFixed(
                    2,
                )} c`,
            );
            // const transcriptResult = await submitVideoForTranscription(outputPathAudio);
            console.log(
                `<\t|\tТранскрибация успешно завершена\t+ ${((Date.now() - date) % 60000).toFixed(
                    2,
                )} c`,
            );

            // const result = JSON.parse(transcriptResult.result.replace('\\"', '"'));
            const result = {
                sentences: [
                    { bt: '00:00:04,034', et: '00:00:05,734', s: 'My Invisalign has...', seq: 1 },
                    {
                        bt: '00:00:05,754',
                        et: '00:00:07,054',
                        s: 'I have taken out my Invisalign.',
                        seq: 2,
                    },
                    {
                        bt: '00:00:07,054',
                        et: '00:00:09,294',
                        s: 'I have taken out my Invisalign, and this is the album.',
                        seq: 3,
                    },
                    { bt: '00:00:09,494', et: '00:00:09,854', s: 'Ah!', seq: 4 },
                    {
                        bt: '00:00:34,166',
                        et: '00:00:36,966',
                        s: 'I have taken out my Invisalign, and this is the album.',
                        seq: 5,
                    },
                    {
                        bt: '00:01:03,490',
                        et: '00:01:06,142',
                        s: "I'm that bad type, make your mama sad type",
                        seq: 6,
                    },
                    {
                        bt: '00:01:06,453',
                        et: '00:01:09,953',
                        s: 'Make your girlfriend mad type, might seduce your dad type',
                        seq: 7,
                    },
                    { bt: '00:01:10,533', et: '00:01:12,713', s: "I'm the bad guy", seq: 8 },
                    { bt: '00:01:14,082', et: '00:01:14,613', s: 'Duh', seq: 9 },
                    { bt: '00:01:14,613', et: '00:01:22,942', s: "I'm the bad guy", seq: 10 },
                    {
                        bt: '00:01:33,442',
                        et: '00:01:36,638',
                        s: "If you know that you don't own me",
                        seq: 11,
                    },
                    {
                        bt: '00:01:36,994',
                        et: '00:01:41,886',
                        s: "I'll let you play the role, I'll be your animal",
                        seq: 12,
                    },
                    {
                        bt: '00:01:42,073',
                        et: '00:01:47,358',
                        s: 'My mommy likes to sing along with me',
                        seq: 13,
                    },
                    {
                        bt: '00:01:47,682',
                        et: '00:01:52,993',
                        s: "But she won't sing this song if she meets all the ladies",
                        seq: 14,
                    },
                    {
                        bt: '00:01:52,993',
                        et: '00:01:56,153',
                        s: "She'll pity the men I know",
                        seq: 15,
                    },
                    {
                        bt: '00:01:56,613',
                        et: '00:01:59,518',
                        s: "So you're a tough guy, like you're really rough guy",
                        seq: 16,
                    },
                    {
                        bt: '00:01:59,810',
                        et: '00:02:03,053',
                        s: "Just can't get enough guy, chest always so puffed guy",
                        seq: 17,
                    },
                    {
                        bt: '00:02:03,053',
                        et: '00:02:03,293',
                        s: "You're a tough guy, like you're really rough guy",
                        seq: 18,
                    },
                    {
                        bt: '00:02:04,619',
                        et: '00:02:06,879',
                        s: "I'm that bad type, make your mama sad type",
                        seq: 19,
                    },
                    {
                        bt: '00:02:06,879',
                        et: '00:02:10,378',
                        s: 'Make your girlfriend mad type, might seduce your dad type',
                        seq: 20,
                    },
                    { bt: '00:02:11,009', et: '00:02:13,139', s: "I'm the bad guy", seq: 21 },
                    { bt: '00:02:14,679', et: '00:02:15,639', s: 'Duh', seq: 22 },
                    { bt: '00:02:20,514', et: '00:02:24,139', s: "I'm the bad guy", seq: 23 },
                    { bt: '00:02:24,139', et: '00:02:24,159', s: 'Duh', seq: 24 },
                    {
                        bt: '00:03:01,698',
                        et: '00:03:03,625',
                        s: 'You said she scared of me?',
                        seq: 25,
                    },
                    {
                        bt: '00:03:03,625',
                        et: '00:03:06,045',
                        s: "I mean, I don't see what she sees",
                        seq: 26,
                    },
                    {
                        bt: '00:03:06,125',
                        et: '00:03:08,478',
                        s: "But maybe it's cause I'm wearing your cologne",
                        seq: 27,
                    },
                ],
                version: 1,
            };

            // const config = {
            //     audio_url: outputPathAudio,
            //     language_code: 'ru',
            // };
            // const transcript = await client.transcripts.create(config);

            // fs.writeFile(
            //     outputPathTextOriginal,
            //     transcriptResult.result.replace('\\"', '"'),
            //     (err) => {
            //         if (err) {
            //             console.error('Ошибка при сохранении файла:', err);
            //         } else {
            //             console.log('Текст успешно сохранен в файл');
            //         }
            //     },
            // );
            return res.status(200).json({
                videoId: url,
                subtitles: result.sentences.map((sentence) => ({
                    text: sentence.s,
                    startAt: sentence.bt,
                    endAt: sentence.et,
                })),
            });

            // const result = await translator.translateText(transcript.text, null, 'en-us');
            // fs.writeFile(outputPathTextTranslated, result.text, (err) => {
            //     if (err) {
            //         console.error('Ошибка при сохранении файла:', err);
            //     } else {
            //         console.log('Текст успешно сохранен в файл');
            //     }
            // });
            //
            // const fileStream = fs.createWriteStream(outputPathAudio);
            // const stream = await PlayHTAPI.stream(result.text);
            // await stream.pipe(fileStream);
        });
});

app.post('/video/translate', (req, res) => {
    const { body } = req;

    return res.status(200).json(body);
});

app.post('/video/voiceover', (req, res) => {
    const { body } = req;

    return res.status(200).json({
        videoSrc: '1710251730069/video.mp4',
        voiceoverSrc: '1710251730069/audio.mp3',
        subtitlesSrc: '1710251730069/textOr.json',
    });
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

const t = {
    code: 11000,
    result: {
        sentences: [
            { bt: '00:00:00,440', et: '00:00:02,840', s: 'Это мсиованский кей пес,', seq: 1 },
            {
                bt: '00:00:02,840',
                et: '00:00:06,420',
                s: 'хулиганский икей вставил свой поршень гигантский,',
                seq: 2,
            },
            { bt: '00:00:06,420', et: '00:00:08,130', s: 'в твой рот уебанский,', seq: 3 },
            {
                bt: '00:00:08,630',
                et: '00:00:12,000',
                s: 'и я снова возвращаюсь в эти онлайн баталии.',
                seq: 4,
            },
            { bt: '00:00:12,170', et: '00:00:12,940', s: 'Сяни по бандида,', seq: 5 },
            { bt: '00:00:12,940', et: '00:00:14,340', s: 'вычё меня не узнали.', seq: 6 },
            { bt: '00:00:14,340', et: '00:00:15,980', s: 'Я врубаюьновь мне за подчётом,', seq: 7 },
            { bt: '00:00:16,050', et: '00:00:17,010', s: 'не за меалими,', seq: 8 },
            {
                bt: '00:00:17,240',
                et: '00:00:19,320',
                s: 'чтобы оформить Дауном четкие пита.',
                seq: 9,
            },
            { bt: '00:00:19,520', et: '00:00:20,470', s: 'Это было давно.', seq: 10 },
            {
                bt: '00:00:20,770',
                et: '00:00:22,940',
                s: 'Касню не знали даже в пределах Ростова.',
                seq: 11,
            },
            { bt: '00:00:23,180', et: '00:00:23,280', s: 'То,', seq: 12 },
            {
                bt: '00:00:23,280',
                et: '00:00:24,820',
                s: 'что весь петух еще кому-то было.',
                seq: 13,
            },
            { bt: '00:00:25,000', et: '00:00:26,260', s: 'В новость было слово,', seq: 14 },
            { bt: '00:00:26,270', et: '00:00:27,140', s: 'но не было слова,', seq: 15 },
            { bt: '00:00:27,720', et: '00:00:29,700', s: 'но хахару всегда значилаhва,', seq: 16 },
            { bt: '00:00:29,890', et: '00:00:30,060', s: 'хова.', seq: 17 },
            { bt: '00:00:31,450', et: '00:00:32,380', s: 'Это долгий путь.', seq: 18 },
            { bt: '00:00:32,410', et: '00:00:32,420', s: 'Нет,', seq: 19 },
            { bt: '00:00:32,480', et: '00:00:33,260', s: 'не твой.', seq: 20 },
            { bt: '00:00:33,960', et: '00:00:35,660', s: 'Это долгий путь домой,', seq: 21 },
            { bt: '00:00:35,880', et: '00:00:37,460', s: 'а эти пидоры везде,', seq: 22 },
            { bt: '00:00:37,770', et: '00:00:38,390', s: 'как мне вынес.', seq: 23 },
            { bt: '00:00:38,730', et: '00:00:39,290', s: 'Всехрики,', seq: 24 },
            { bt: '00:00:39,290', et: '00:00:40,140', s: 'напиши мне тек,', seq: 25 },
            { bt: '00:00:40,140', et: '00:00:40,970', s: 'веду себя,', seq: 26 },
            { bt: '00:00:41,070', et: '00:00:41,540', s: 'как дома,', seq: 27 },
            { bt: '00:00:41,540', et: '00:00:42,760', s: 'эти суки не готовы.', seq: 28 },
            { bt: '00:00:42,760', et: '00:00:44,340', s: 'Твои зубы на бетоне кладу,', seq: 29 },
            { bt: '00:00:44,340', et: '00:00:45,350', s: 'хуй тебе на жопу.', seq: 30 },
            {
                bt: '00:00:45,450',
                et: '00:00:47,820',
                s: 'Спустя три Грэми и четыре культовых альбома,',
                seq: 31,
            },
            {
                bt: '00:00:47,820',
                et: '00:00:50,430',
                s: 'я в стою на долгий путь за головой оксимирона.',
                seq: 32,
            },
        ],
        version: 1,
    },
    msg: 'Transcribed successfully',
};
