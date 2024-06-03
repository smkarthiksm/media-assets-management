import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { EditModalState } from '../../models/edit-modal';

const initialState: EditModalState = {
  title: '',
  album: '',
  artist: '',
  index: -1,
  isEditModalVisible: false,
};

const editModalSlice = createSlice({
  initialState,
  name: 'edit-modal',
  reducers: {
    setEditModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isEditModalVisible = action.payload;
    },
    setEditModalIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    updateEditModalFields: (
      state,
      action: PayloadAction<{ prop: string; value?: string }>,
    ) => {
      const { prop, value } = action.payload;
      state[prop as 'title' | 'album' | 'artist'] = value;
    },
  },
});

export const editModalStateSelector = (state: RootState) => state.editModal;
export const {
  updateEditModalFields,
  setEditModalIndex,
  setEditModalVisibility,
} = editModalSlice.actions;
export default editModalSlice.reducer;
