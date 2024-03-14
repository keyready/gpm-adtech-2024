const { createWriteStream } = require('fs');
const axios = require('axios');
const PlayHTAPI = require('playht');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

PlayHTAPI.init({
    apiKey: process.env.PLAYHT_API_KEY,
    userId: process.env.PLAYHT_USER_ID,
    // defaultVoiceId:
    //     's3://voice-cloning-zero-shot/255f5d7a-ea3d-41ac-ac0b-30bbc8533bdd/original/manifest.json',
});

const streamAudio = async (sentence) => {
    const response = await PlayHTAPI.generate(sentence, {
        voiceId:
            's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',
        outputFormat: 'mp3',
        voiceEngine: 'PlayHT2.0',
        sampleRate: '44100',
        speed: 1,
    });

    return response.audioUrl;
};

async function downloadFile(fileUrl, outputLocationPath) {
    const writer = createWriteStream(outputLocationPath);

    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then((response) => {
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    });
}

async function createVoiceover(sentence, destinationFile) {
    try {
        const voiceOverUrl = await streamAudio(sentence);
        await downloadFile(voiceOverUrl, destinationFile);
    } catch (error) {
        console.error('Ошибка при создании голосового озвучивания:', error);
    }
}

module.exports = {
    createVoiceover,
};
