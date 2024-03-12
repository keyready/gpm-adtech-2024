import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from '../types/UserSchema';
import { signUpUser } from '../services/SignUpUser';
import { User } from '../types/User';

const initialState: UserSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.data = undefined;
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
