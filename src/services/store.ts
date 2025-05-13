import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredients/ingredientsSlice';
import { burgerConstructorSlice } from '../slices/burgerConstructor/burgerConstructorSlice';
import { feedSlice } from '../slices/feed/feedSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices(
  ingredientsSlice,
  burgerConstructorSlice,
  feedSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
