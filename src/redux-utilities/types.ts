import { Action, ThunkAction } from '@reduxjs/toolkit';
import { reducers, store } from './store';

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
