const fs = require('fs');

function formatTime(time) {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2]).toFixed(3);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(6, '0')}`;
}

function convertCustomSubtitlesToSRT(inputSubtitles, outputFilePath) {
    let srtContent = '';
    let counter = 1;

    inputSubtitles.sentences.forEach((sentence) => {
        const startTime = sentence.bt.replace(',', '.');
        const endTime = sentence.et.replace(',', '.');
        const text = sentence.s.replace(/\n/g, ' '); // Заменяем переносы строк на пробелы

        // Форматирование времени в формат SRT
        const start = formatTime(startTime);
        const end = formatTime(endTime);

        srtContent += `${counter}\n${start} --> ${end}\n${text}\n\n`;
        counter += 1;
    });

    fs.writeFileSync(outputFilePath, srtContent);
}

module.exports = {
    convertCustomSubtitlesToSRT,
};
