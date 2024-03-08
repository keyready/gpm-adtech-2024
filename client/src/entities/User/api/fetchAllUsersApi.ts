import { rtkApi } from 'shared/api/rtkApi';
import { User } from '../model/types/User';

const fetchAllUsersApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<User[], void>({
            query: () => ({
                url: '/users/fetch_all_users',
            }),
        }),
    }),
});

export const useUsers = fetchAllUsersApi.useGetUsersQuery;
