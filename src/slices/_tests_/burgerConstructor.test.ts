import { describe, expect, test, beforeEach } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorSliceReducer, { addIngredient, removeIngredient, moveIngredientUp, moveIngredientDown } from '../burgerConstructor/burgerConstructorSlice';
import { ingredientMain, ingredientSauce } from './mockData';

describe('Тесты редьюсера слайса burgerConstructor', () => {

  let store = configureStore({
    reducer: burgerConstructorSliceReducer
  });

  beforeEach(() => {
    store = configureStore({
        reducer: burgerConstructorSliceReducer
    });
  });

  test('экшен добавления ингридиента', () => {
    store.dispatch(addIngredient(ingredientMain));
    const state = store.getState();
    expect(state.ingredients.length).toBe(1);
  });

  test('экшен удаления ингридиента', () => {
    store.dispatch(addIngredient(ingredientMain));
    store.dispatch(removeIngredient(store.getState().ingredients[0]));
    expect(store.getState().ingredients.length).toBe(0);
  });

  test('экшен перемещения ингридиента вверх', () => {
    store.dispatch(addIngredient(ingredientMain));
    store.dispatch(addIngredient(ingredientSauce));
    let state = store.getState();
    const expectedResult = [state.ingredients[1], state.ingredients[0]];
    store.dispatch(moveIngredientUp(state.ingredients[1]));
    expect(store.getState().ingredients).toEqual(expectedResult);
  });

  test('экшен перемещения ингридиента вниз', () => {
    store.dispatch(addIngredient(ingredientMain));
    store.dispatch(addIngredient(ingredientSauce));
    let state = store.getState();
    const expectedResult = [state.ingredients[1], state.ingredients[0]];
    store.dispatch(moveIngredientDown(state.ingredients[0]));
    expect(store.getState().ingredients).toEqual(expectedResult);
  });

});