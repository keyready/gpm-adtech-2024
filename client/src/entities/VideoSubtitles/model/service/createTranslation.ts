import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { VideoSubtitles } from '../types/VideoSubtitles';

export const createTranslation = createAsyncThunk<
    VideoSubtitles,
    VideoSubtitles,
    ThunkConfig<string>
>('VideoSubtitles/createTranslation', async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<VideoSubtitles>('/video/translate', props);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        const axiosError = e as AxiosError;
        return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
    }
});
