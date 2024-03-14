import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { VideoSubtitles } from '../types/VideoSubtitles';

export const createLocalVideoSubtitles = createAsyncThunk<
    VideoSubtitles,
    FormData,
    ThunkConfig<string>
>('VideoSubtitles/createLocalVideoSubtitles', async (props, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<VideoSubtitles>('/video/upload_local', props);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});
