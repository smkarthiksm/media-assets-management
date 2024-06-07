import {
  UnknownAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import loaderReducer from './slices/loader-slice';
import allFilesReducer from './slices/all-files-slice';
import editFileModalReducer from './slices/edit-file-modal.slice';
import deleteFileModalReducer from './slices/delete-file-modal.slice';
import uploadFileModalReducer from './slices/upload-file-modal.slice';
import fileUploadStepperReducer from './slices/file-upload-stepper-slice';
import { RootState } from './types';

export const combinedReducers = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  allFiles: allFilesReducer,
  editFileModal: editFileModalReducer,
  deleteFileModal: deleteFileModalReducer,
  uploadFileModal: uploadFileModalReducer,
  fileUploadStepper: fileUploadStepperReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: UnknownAction) => {
  if (action.type === 'logout') {
    return combinedReducers({}, action);
  }
  return combinedReducers(state, action);
};

export const appStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState,
  });
};
