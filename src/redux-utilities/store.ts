import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/auth-slice';

export const reducers = combineReducers({
  login: loginReducer,
});

export const store = configureStore({
  reducer: reducers,
});
