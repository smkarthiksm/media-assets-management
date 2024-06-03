import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { EditModalState } from '../../models/edit-modal';

const initialState: EditModalState = {
  title: '',
  album: '',
  artist: '',
  index: -1,
  isVisible: false,
};

const editModalSlice = createSlice({
  initialState,
  name: 'edit-modal',
  reducers: {
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    updateFields: (
      state,
      action: PayloadAction<{ prop: string; value?: string }>,
    ) => {
      const { prop, value } = action.payload;
      state[prop as 'title' | 'album' | 'artist'] = value;
    },
  },
});

export const editModalStateSelector = (state: RootState) => state.editModal;
export const { updateFields, setIndex, setVisibility } = editModalSlice.actions;
export default editModalSlice.reducer;
