import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { LoaderState } from '../../models/loader';

const initialState: LoaderState = {
  isLoaderVisible: false,
};

const loaderSlice = createSlice({
  initialState,
  name: 'loader',
  reducers: {
    setLoaderVisibility: (state, action: PayloadAction<boolean>) => {
      state.isLoaderVisible = action.payload;
    },
  },
});

export const loaderStateSelector = (state: RootState) => state.loader;
export const { setLoaderVisibility } = loaderSlice.actions;
export default loaderSlice.reducer;
