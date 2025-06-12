import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderSliceReducer, { clearOrderData, clearOrderInfo, orderBurgerAsync, getOrderByNumberAsync } from '../order/orderSlice';
import { order } from './mockData';

describe('Тесты редьюсера слайса order', () => {

  let store = configureStore({
    reducer: orderSliceReducer
  });

  beforeEach(() => {
    store = configureStore({
        reducer: orderSliceReducer
    });
  });

  test('Тест создания заказа: Значение флага orderRequest меняется на true при вызове экшена orderBurgerAsync', () => {
    const ingredientsId = order.ingredients;
    store.dispatch(orderBurgerAsync.pending('test', ingredientsId));
    expect(store.getState().orderRequest).toBe(true);
  });

  test('Тест создания заказа: Если при произошла ошибка, она записывается в стор, значение флага orderRequest меняется на false', () => {
    const ingredientsId = order.ingredients;  
    const error = new Error('Failed to create order');
    store.dispatch(orderBurgerAsync.rejected(error, 'test', ingredientsId)); 
    const state = store.getState();
    expect(state.orderRequest).toBe(false);
    expect(state.errorMessage).toBe(error.message);
  });

  test('Тест создания заказа: при успешном выполнении, данные записываются в стор, сбрасывается флаг orderRequest и текст errorMessage', () => {
    const ingredientsId = order.ingredients;
    store.dispatch(orderBurgerAsync.fulfilled(order, 'test', ingredientsId));
    const state = store.getState();
    expect(state.orderRequest).toBe(false);
    expect(state.errorMessage).toBe('');
    expect(state.orderData).toEqual(order);
    store.dispatch(clearOrderData());
    expect(store.getState().orderData).toBeNull();
  });

  test('Тест получения заказа по номеру и последующей очистки информации о заказе', () => {
    store.dispatch(getOrderByNumberAsync.fulfilled(order, 'test', order.number));
    expect(store.getState().orderInfo).toEqual(order);
    store.dispatch(clearOrderInfo());
    expect(store.getState().orderInfo).toBeNull();
  });

});