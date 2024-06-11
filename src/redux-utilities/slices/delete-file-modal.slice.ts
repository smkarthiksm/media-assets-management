import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { DeleteFileModalState } from '../../models/delete-file-modal';

const initialState: DeleteFileModalState = {
  index: -1,
  isDeleteFileModalVisible: false,
  fileName: '',
};

const deleteFileModalSlice = createSlice({
  initialState,
  name: 'delete-file-modal',
  reducers: {
    setDeleteFileModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isDeleteFileModalVisible = action.payload;
    },
    setDeleteFileModalFileDetails: (
      state,
      action: PayloadAction<{ fileName?: string; index: number }>,
    ) => {
      state.index = action.payload.index;
      state.fileName = action.payload.fileName;
    },
  },
});

export const deleteFileModalStateSelector = (state: RootState) =>
  state.deleteFileModal;
export const { setDeleteFileModalFileDetails, setDeleteFileModalVisibility } =
  deleteFileModalSlice.actions;
export default deleteFileModalSlice.reducer;
