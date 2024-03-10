import { StateSchema } from 'app/providers/StoreProvider';

export const getHistoryItemData = (state: StateSchema) => state.historyItems?.data;
export const getHistoryItemIsLoading = (state: StateSchema) => state.historyItems?.isLoading;
export const getHistoryItemError = (state: StateSchema) => state.historyItems?.error;
