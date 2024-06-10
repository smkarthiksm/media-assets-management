import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSession } from '../../api';
import { RootState } from '../types';
import { AuthState } from '../../models/auth';

const initialState: AuthState = {
  email: '',
  password: '',
  isLoaderVisible: false,
  loginError: false,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    updateFields: (state, action: PayloadAction<{ [key: string]: string }>) => {
      const { prop, value } = action.payload;
      state[prop as 'email' | 'password'] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoaderVisible = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoaderVisible = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoaderVisible = false;
        state.loginError = true;
      });
  },
});

// Thunks
export const login = createAsyncThunk(
  'auth/login',
  ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => getSession(email, password),
);

export const authStateSelector = (state: RootState) => state.auth;
export const { updateFields } = authSlice.actions;
export default authSlice.reducer;
