import {expect, test, describe, jest} from '@jest/globals';
import {configureStore } from '@reduxjs/toolkit';
import ingredientsSliceReducer, { getIngredientsAsync } from '../ingredients/ingredientsSlice';
import {ingredient1, ingredient2, bun } from './mockData';

describe('Тесты редьюсера слайса ingredients', () => {

  let store = configureStore({
    reducer: ingredientsSliceReducer
  });

  beforeEach(() => {
    store = configureStore({
        reducer: ingredientsSliceReducer
    });
  });

  test('Значение флага isIngredientsLoading меняется на true при вызове экшена getIngredientsAsync', () => {
    store.dispatch(getIngredientsAsync.pending('test'));
    expect(store.getState().isIngredientsLoading).toBe(true);
  });

  test('При успешном получении ингридиентов данные записываются в стор, а значение флага isIngredientsLoading меняется на false', () => {
    const mockIngredients = [ingredient1, ingredient2, bun];
    store.dispatch(getIngredientsAsync.fulfilled(mockIngredients, 'test'));
    expect(store.getState().isIngredientsLoading).toBe(false);
  });

  test('Если при получении ингридиентов произошла ошибка, она записывается в стор, значение флага isIngredientsLoading меняется на false', () => {
    const error = new Error('Failed to load ingredients');
    store.dispatch(getIngredientsAsync.rejected(error, 'test')); 
    const state = store.getState();
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.errorMessage).toBe(error.message);
  });

});