import { Action, ThunkAction } from '@reduxjs/toolkit';
import { combinedReducers, store } from './store';

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
