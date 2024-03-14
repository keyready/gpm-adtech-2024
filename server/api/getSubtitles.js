const https = require('https');
const querystring = require('querystring');
const fs = require('fs');
const { randomUUID } = require('crypto');

const API_KEY_ID = 'ifkysbDK5BE0Ds3S';
const API_KEY_SECRET = 'ZvBBWZGsqr2GeJ2C';
const LANG = 'ru';
const RESULT_TYPE = 2;

module.exports = async function submitVideoForTranscription(filePath) {
    return new Promise((resolve, reject) => {
        const createData = querystring.stringify({
            lang: LANG,
            remotePath: filePath,
        });

        let createRequest;
        if (filePath.startsWith('http')) {
            createRequest = https.request({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': createData.length,
                    'keyId': API_KEY_ID,
                    'keySecret': API_KEY_SECRET,
                },
                body: createData,
                hostname: 'api.speechflow.io',
                path: '/asr/file/v1/create',
            });
        } else {
            let formData = '';
            const boundary = randomUUID().replace(/-/g, '');
            formData += `--${boundary}\r\n`;
            formData += `Content-Disposition: form-data; name="file"; filename="${getFileNameByPath(
                filePath,
            )}"\r\n`;
            formData += 'Content-Type: application/octet-stream\r\n\r\n';
            const formDataBuffer = Buffer.concat([
                Buffer.from(formData, 'utf8'),
                fs.readFileSync(filePath),
                Buffer.from(`\r\n--${boundary}--\r\n`, 'utf8'),
            ]);
            createRequest = https.request({
                method: 'POST',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Content-Length': formDataBuffer.length,
                    'keyId': API_KEY_ID,
                    'keySecret': API_KEY_SECRET,
                },
                hostname: 'api.speechflow.io',
                path: `/asr/file/v1/create?lang=${LANG}`,
            });
            createRequest.write(formDataBuffer);
        }

        createRequest.on('response', (createResponse) => {
            let responseData = '';

            createResponse.on('data', (chunk) => {
                responseData += chunk;
            });

            createResponse.on('end', () => {
                const responseJSON = JSON.parse(responseData);
                if (responseJSON.code == 10000) {
                    const { taskId } = responseJSON;
                    const intervalID = setInterval(() => {
                        const queryRequest = https.request(
                            {
                                method: 'GET',
                                headers: {
                                    keyId: API_KEY_ID,
                                    keySecret: API_KEY_SECRET,
                                },
                                hostname: 'api.speechflow.io',
                                path: `/asr/file/v1/query?taskId=${taskId}&resultType=${RESULT_TYPE}`,
                            },
                            (queryResponse) => {
                                let responseData = '';

                                queryResponse.on('data', (chunk) => {
                                    responseData += chunk;
                                });

                                queryResponse.on('end', () => {
                                    const responseJSON = JSON.parse(responseData);
                                    if (responseJSON.code === 11000) {
                                        clearInterval(intervalID);
                                        resolve(responseJSON);
                                    } else if (responseJSON.code == 11001) {
                                        // Оставляем интервал активным, если ожидание продолжается
                                    } else {
                                        clearInterval(intervalID);
                                        reject(new Error(responseJSON.msg));
                                    }
                                });
                            },
                        );

                        queryRequest.on('error', (error) => {
                            clearInterval(intervalID);
                            reject(error);
                        });
                        queryRequest.end();
                    }, 3000);
                } else {
                    reject(new Error(responseJSON.msg));
                }
            });
        });

        createRequest.on('error', (error) => {
            reject(error);
        });

        createRequest.write(createData);
        createRequest.end();
    });
};

function getFileNameByPath(path) {
    const index = path.lastIndexOf('/');
    return path.substring(index + 1);
}

// // Пример использования функции
// submitVideoForTranscription("C:/Users/vipko/Desktop/Новая папка/МС ХОВАНСКИЙ - В долгий путь (1 раунд 17ib).mp4")
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
