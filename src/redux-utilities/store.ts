import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import loaderReducer from './slices/loader-slice';
import allFilesReducer from './slices/all-files-slice';
import editModalReducer from './slices/edit-modal.slice';
import deleteModalReducer from './slices/delete-modal.slice';

export const reducers = combineReducers({
  login: authReducer,
  loader: loaderReducer,
  allFiles: allFilesReducer,
  editModal: editModalReducer,
  deleteModal: deleteModalReducer,
});

export const store = configureStore({
  reducer: reducers,
});
