interface Subtitle {
    text?: string;
    startAt: string;
    endAt: string;
}

export interface VideoSubtitles {
    subtitles?: Subtitle[];
    videoId: string;
}
