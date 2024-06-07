import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';
import { FileUploadStepperState } from '../../models/file-upload-stepper';
import { AudioFile } from '../../stubs/files';

const initialState: FileUploadStepperState = {
  activeStep: 0,
  files: [],
};

const fileUploadStepperSlice = createSlice({
  initialState,
  name: 'file-upload-stepper',
  reducers: {
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    addFiles: (state, action: PayloadAction<Partial<AudioFile>[]>) => {
      state.files = [...state.files, ...action.payload];
    },
    updateFileInputFields: (
      state,
      action: PayloadAction<{ index: number; prop: string; value: string }>,
    ) => {
      const { prop, value, index } = action.payload;
      state.files[index][prop as 'title' | 'album' | 'artist'] = value;
    },
    removeFile: (state, action: PayloadAction<number>) => {
      state.files = state.files.filter((e, index) => index !== action.payload);
    },
    resetFileUploadStepper: () => {
      return initialState;
    },
  },
});

export const fileUploadStepperStateSelector = (state: RootState) =>
  state.fileUploadStepper;
export const {
  setActiveStep,
  addFiles,
  updateFileInputFields,
  removeFile,
  resetFileUploadStepper,
} = fileUploadStepperSlice.actions;
export default fileUploadStepperSlice.reducer;
