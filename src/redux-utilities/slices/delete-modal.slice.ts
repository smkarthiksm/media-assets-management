import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { DeleteModalState } from '../../models/delete-modal';

const initialState: DeleteModalState = {
  index: -1,
  isDeleteModalVisible: false,
};

const deleteModalSlice = createSlice({
  initialState,
  name: 'delete-modal',
  reducers: {
    setDeleteModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModalVisible = action.payload;
    },
    setDeleteModalIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
  },
});

export const deleteModalStateSelector = (state: RootState) => state.deleteModal;
export const { setDeleteModalIndex, setDeleteModalVisibility } =
  deleteModalSlice.actions;
export default deleteModalSlice.reducer;
