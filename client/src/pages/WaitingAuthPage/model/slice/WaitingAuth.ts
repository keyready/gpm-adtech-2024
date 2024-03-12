import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WaitingAuthPageSchema } from '../types/WaitingAuthPage';
import { checkYandexCode } from '../services/checkYandexCode';

const initialState: WaitingAuthPageSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const WaitingAuthSlice = createSlice({
    name: 'WaitingAuthSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkYandexCode.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(checkYandexCode.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(checkYandexCode.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: WaitingAuthActions } = WaitingAuthSlice;
export const { reducer: WaitingAuthReducer } = WaitingAuthSlice;
