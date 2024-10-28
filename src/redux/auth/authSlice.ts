import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'
import { AuthState } from '../../interfaces/auth/auth.interface';

const token = localStorage.getItem('x-token');

// Helper function to verify if token is valid or expired
const isTokenValid = (token: string | null): boolean => {

    if (!token) return false;
    try {
        const decoded: { exp: number } = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch (error) {
        return false;
    }
};

const initialState: AuthState = {
    isAuthenticated: token ? isTokenValid(token) : false,
    token: isTokenValid(token) ? token : null,
    userId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ isAuthenticated: boolean; token: string; userId: string }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.userId = null;
            localStorage.removeItem('x-token');
        },
    },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
