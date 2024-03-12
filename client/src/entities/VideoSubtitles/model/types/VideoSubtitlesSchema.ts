import { VideoSubtitles } from './VideoSubtitles';

export interface VideoSubtitlesSchema {
    data?: VideoSubtitles;
    isLoading: boolean;
    error?: string;
}
