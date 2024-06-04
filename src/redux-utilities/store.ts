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

export const combinedReducers = combineReducers({
  login: authReducer,
  loader: loaderReducer,
  allFiles: allFilesReducer,
  editFileModal: editFileModalReducer,
  deleteFileModal: deleteFileModalReducer,
  uploadFileModal: uploadFileModalReducer,
  fileUploadStepper: fileUploadStepperReducer,
});

const rootReducer = (state: any, action: UnknownAction) => {
  if (action.type === 'logout') {
    return combinedReducers({}, action);
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
