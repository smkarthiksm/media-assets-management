import { Action, ThunkAction } from '@reduxjs/toolkit';
import { appStore, combinedReducers } from './store';

export type RootState = ReturnType<typeof combinedReducers>;
export type AppStore = ReturnType<typeof appStore>;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
