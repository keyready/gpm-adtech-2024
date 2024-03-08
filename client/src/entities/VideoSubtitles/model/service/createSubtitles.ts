import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { VideoSubtitles } from '../types/VideoSubtitles';

interface Props {
    url: string;
}

export const createSubtitles = createAsyncThunk<VideoSubtitles, Props, ThunkConfig<string>>(
    'VideoSubtitles/createSubtitles',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<VideoSubtitles>('/video/upload', props);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
