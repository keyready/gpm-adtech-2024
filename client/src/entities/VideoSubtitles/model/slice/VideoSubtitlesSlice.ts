import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSubtitles } from '../service/createSubtitles';
import { VideoSubtitlesSchema } from '../types/VideoSubtitlesSchema';
import { createVoiceover } from '../service/createVoiceover';
import { createTranslation } from '../service/createTranslation';

const initialState: VideoSubtitlesSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const VideoSubtitlesSlice = createSlice({
    name: 'VideoSubtitlesSlice',
    initialState,
    reducers: {
        setTranscriptionResult: (state, action: PayloadAction<any>) => {
            if (state?.data) {
                state.data.result = action.payload;
            }
        },
    },
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
            })

            .addCase(createVoiceover.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createVoiceover.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
            })
            .addCase(createVoiceover.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createTranslation.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTranslation.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
            })
            .addCase(createTranslation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: VideoSubtitlesActions } = VideoSubtitlesSlice;
export const { reducer: VideoSubtitlesReducer } = VideoSubtitlesSlice;
