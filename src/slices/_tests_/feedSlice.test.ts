import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedSliceReducer, { getFeedAsync } from '../feed/feedSlice';
import { feed } from './mockData';

describe('Тесты редьюсера слайса ingredients', () => {

  let store = configureStore({
    reducer: feedSliceReducer
  });

  beforeEach(() => {
    store = configureStore({
        reducer: feedSliceReducer
    });
  });

  test('Значение флага isLoading меняется на true при вызове экшена getFeedAsync', () => {
    store.dispatch(getFeedAsync.pending('test'));
    expect(store.getState().isLoading).toBe(true);
  });

  test('При успешном получении ленты заказов данные записываются в стор, а значение флага isLoading меняется на false', () => {
    store.dispatch(getFeedAsync.fulfilled(feed, 'test'));
    const state = store.getState();
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe('');
    expect(state.orders).toEqual(feed.orders);
    expect(state.total).toEqual(feed.total);
    expect(state.totalToday).toEqual(feed.totalToday);
  });

  test('Если при получении ленты заказов произошла ошибка, она записывается в стор, значение флага isLoading меняется на false', () => {
    const error = new Error('Failed to load feed');
    store.dispatch(getFeedAsync.rejected(error, 'test')); 
    const state = store.getState();
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe(error.message);
  });

});