import { HistoryItemType } from './HistoryItemType';

export interface HistoryItemSchema {
    data?: HistoryItemType;
    isLoading: boolean;
    error?: string;
}
