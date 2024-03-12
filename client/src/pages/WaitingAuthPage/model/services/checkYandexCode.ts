import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { AxiosError } from 'axios';
import { User, UserActions } from 'entities/User';
import { WaitingAuthPage } from '../types/WaitingAuthPage';

export const checkYandexCode = createAsyncThunk<User, WaitingAuthPage, ThunkConfig<string>>(
    'WaitingAuthPage/checkYandexCode',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post<User>('/user/yandex-auth', props);

            if (!response.data) {
                throw new Error();
            }

            dispatch(UserActions.setUserData(response.data));

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
