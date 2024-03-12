import { rtkApi } from 'shared/api/rtkApi';
import { HistoryItemType } from '../model/types/HistoryItemType';

const fetchUserHistory = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserHistory: build.query<HistoryItemType[], number>({
            query: (userId) => ({
                url: '/history/fetch_all',
                params: {
                    userId,
                },
            }),
        }),
    }),
});

export const useUserHistory = fetchUserHistory.useGetUserHistoryQuery;
