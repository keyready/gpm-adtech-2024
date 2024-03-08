const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();

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

    return res.status(200).json({
        subtitles: [
            {
                text: 'Accusantium aliquam consequuntur delectus dignissimos ea enim eum eveniet ipsa laborum, magni minima nesciunt nobis nulla, odit quod sequi suscipit, tempore veritatis voluptates. Delectus facilis obcaecati officiis perferendis.',
                startAt: '00:00',
                endAt: '00:13',
            },
            {
                text: 'Accusantium aliquam consequuntur delectus dignissimos ea enim eum eveniet ipsa laborum, magni minima nesciunt nobis nulla, odit quod sequi suscipit, tempore veritatis voluptates. Delectus ex facilis obcaecati officiis perferendis.',
                startAt: '00:13',
                endAt: '00:21',
            },
        ],
    });
});

app.listen(5000, () => {
    console.log('Сервер запущен');
});
