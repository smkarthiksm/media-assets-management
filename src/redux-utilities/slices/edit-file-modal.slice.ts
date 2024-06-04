import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { EditFileModalState } from '../../models/edit-file-modal';

const initialState: EditFileModalState = {
  title: '',
  album: '',
  artist: '',
  index: -1,
  isEditFileModalVisible: false,
};

const editFileModalSlice = createSlice({
  initialState,
  name: 'edit-modal',
  reducers: {
    setEditFileModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isEditFileModalVisible = action.payload;
    },
    setEditFileModalIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    updateEditFileModalFields: (
      state,
      action: PayloadAction<{ prop: string; value?: string }>,
    ) => {
      const { prop, value } = action.payload;
      state[prop as 'title' | 'album' | 'artist'] = value;
    },
  },
});

export const editFileModalStateSelector = (state: RootState) => state.editFileModal;
export const {
  setEditFileModalVisibility,
  setEditFileModalIndex,
  updateEditFileModalFields,
} = editFileModalSlice.actions;
export default editFileModalSlice.reducer;
