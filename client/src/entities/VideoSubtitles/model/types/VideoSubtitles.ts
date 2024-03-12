interface Subtitle {
    text?: string;
    startAt: string;
    endAt: string;
}

interface TranscriptionResult {
    videoSrc: string;
    voiceoverSrc: string;
    subtitlesSrc: string;
}

export interface VideoSubtitles {
    subtitles?: Subtitle[];
    videoId?: string;
    result?: TranscriptionResult;
}
