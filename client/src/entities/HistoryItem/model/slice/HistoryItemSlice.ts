import { createSlice } from '@reduxjs/toolkit';
import { HistoryItemSchema } from '../types/HistoryItemSchema';

const initialState: HistoryItemSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const HistoryItemSlice = createSlice({
    name: 'HistoryItemSlice',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchHistoryItem.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchHistoryItem.fulfilled, (state, action: PayloadAction<any>) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchHistoryItem.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: HistoryItemActions } = HistoryItemSlice;
export const { reducer: HistoryItemReducer } = HistoryItemSlice;
