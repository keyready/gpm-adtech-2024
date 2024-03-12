import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { VideoSubtitlesActions } from '../slice/VideoSubtitlesSlice';
import { VideoSubtitles } from '../types/VideoSubtitles';

interface VoiceoveredVideo {
    videoSrc: string;
    voiceoverSrc: string;
    subtitlesSrc: string;
}

export const createVoiceover = createAsyncThunk<
    VoiceoveredVideo,
    VideoSubtitles,
    ThunkConfig<string>
>('VideoSubtitles/createVoiceover', async (props, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await extra.api.post<VoiceoveredVideo>('/video/voiceover', props);

        if (!response.data) {
            throw new Error();
        }

        dispatch(VideoSubtitlesActions.setTranscriptionResult(response.data));
        return response.data;
    } catch (e) {
        const axiosError = e as AxiosError;
        return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
    }
});
