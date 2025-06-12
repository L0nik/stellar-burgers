import { expect, test, describe} from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsSliceReducer, { getIngredientsAsync } from '../ingredients/ingredientsSlice';
import { ingredientMain, ingredientSauce, ingredientBun } from './mockData';

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
    const ingredientsList = [ingredientMain, ingredientSauce, ingredientBun];
    store.dispatch(getIngredientsAsync.fulfilled(ingredientsList, 'test'));
    const state = store.getState();
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredientsList).toEqual(ingredientsList);
    expect(state.buns).toEqual([ingredientBun]);
    expect(state.mains).toEqual([ingredientMain]);
    expect(state.sauces).toEqual([ingredientSauce]);
  });

  test('Если при получении ингридиентов произошла ошибка, она записывается в стор, значение флага isIngredientsLoading меняется на false', () => {
    const error = new Error('Failed to load ingredients');
    store.dispatch(getIngredientsAsync.rejected(error, 'test')); 
    const state = store.getState();
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.errorMessage).toBe(error.message);
  });

});