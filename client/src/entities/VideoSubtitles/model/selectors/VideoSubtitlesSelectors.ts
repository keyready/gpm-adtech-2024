import { StateSchema } from 'app/providers/StoreProvider';

export const getVideoSubtitlesData = (state: StateSchema) => state.video?.data;
export const getVideoSubtitlesIsLoading = (state: StateSchema) => state.video?.isLoading;
export const getVideoSubtitlesError = (state: StateSchema) => state.video?.error;
