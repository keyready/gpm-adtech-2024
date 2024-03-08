import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSubtitles } from '../service/createSubtitles';
import { VideoSubtitlesSchema } from '../types/VideoSubtitlesSchema';

const initialState: VideoSubtitlesSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const VideoSubtitlesSlice = createSlice({
    name: 'VideoSubtitlesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSubtitles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createSubtitles.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createSubtitles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: VideoSubtitlesActions } = VideoSubtitlesSlice;
export const { reducer: VideoSubtitlesReducer } = VideoSubtitlesSlice;
