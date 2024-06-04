import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { DeleteFileModalState } from '../../models/delete-file-modal';

const initialState: DeleteFileModalState = {
  index: -1,
  isDeleteFileModalVisible: false,
};

const deleteFileModalSlice = createSlice({
  initialState,
  name: 'delete-file-modal',
  reducers: {
    setDeleteFileModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isDeleteFileModalVisible = action.payload;
    },
    setDeleteFileModalIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const deleteFileModalStateSelector = (state: RootState) =>
  state.deleteFileModal;
export const { setDeleteFileModalIndex, setDeleteFileModalVisibility } =
  deleteFileModalSlice.actions;
export default deleteFileModalSlice.reducer;