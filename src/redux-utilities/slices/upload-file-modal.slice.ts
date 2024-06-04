import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { UploadFileModalState } from '../../models/upload-file-modal';

const initialState: UploadFileModalState = {
  isUploadFileModalVisible: false,
};

const uploadFileModalSlice = createSlice({
  initialState,
  name: 'upload-modal',
  reducers: {
    setUploadFileModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isUploadFileModalVisible = action.payload;
    },
  },
});

export const uploadFileModalStateSelector = (state: RootState) =>
  state.uploadFileModal;
export const { setUploadFileModalVisibility } = uploadFileModalSlice.actions;
export default uploadFileModalSlice.reducer;
