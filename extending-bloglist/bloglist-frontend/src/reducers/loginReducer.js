import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';

const initialState = {
    credentials: null,
    user: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = loginSlice.actions;
export default loginSlice.reducer;

export const login = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials);
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
        dispatch(setUser(user));
    };
};

export const selectCredentials = (state) => state.login.credentials;
export const selectUser = (state) => state.login.user;
