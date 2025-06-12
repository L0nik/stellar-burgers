import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from '../user/userSlice'; 
import { 
  getUserAsync,
  loginUserAsync,
  registerUserAsync,
  updateUserAsync,
  getOrdersAsync
} from '../user/userSlice';
import { user, loginData, authResponse, registerData, order } from './mockData';
import { getCookie } from 'src/utils/cookie';

describe('Тесты редьюсера слайса user', () => {

  let store = configureStore({
    reducer: userSliceReducer
  });

  beforeEach(() => {
    store = configureStore({
        reducer: userSliceReducer
    });
  });

  test('Тест получения данных пользователя: ошибка', () => {
    const error = new Error('Failed to fetch user');
    store.dispatch(getUserAsync.rejected(error, 'test'));
    const state = store.getState();
    expect(state.userData).toBeNull();
  });

  test('Тест получения данных пользователя: успешное выполнение', () => {
    store.dispatch(getUserAsync.fulfilled(user, 'test'));
    const state = store.getState();
    expect(state.userData).toEqual(user);
  });

  test('Тест авторизации: ошибка', () => {
    const error = new Error('Failed to log in');
    store.dispatch(loginUserAsync.rejected(error, 'test', loginData));
    const state = store.getState();
    expect(state.userData).toBeNull();
    expect(state.isAuthChecked).toBe(false);
    expect(state.loginError).toBe(error.message);
  });

  test('Тест авторизации: успешное выполнение', () => {
    store.dispatch(loginUserAsync.fulfilled({...authResponse, success: true}, 'test', loginData));
    const state = store.getState();
    expect(state.userData).toEqual(authResponse.user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginError).toBe('');
  });

  test('тест регистрации: ошибка', () => {
    const error = new Error('Failed to register user');
    store.dispatch(registerUserAsync.rejected(error, 'test', registerData));
    const state = store.getState();
    expect(state.userData).toBeNull();
  });

  test('тест регистрации: успешное выполнение', () => {
    store.dispatch(registerUserAsync.fulfilled({...authResponse, success: true}, 'test', registerData));
    const state = store.getState();
    expect(state.userData).toEqual(authResponse.user);
    expect(state.loginError).toBe('');
  });

  test('тест апдейта юзера: ошибка', () => {
    store.dispatch(getUserAsync.fulfilled(user, 'test'));
    const error = new Error('Failed to update user');
    const updatedUser = {...user, name: `${user.name}Updated`}
    store.dispatch(updateUserAsync.rejected(error, 'test', updatedUser));
    const state = store.getState();
    expect(state.userData).toEqual(user);
  });


  test('тест апдейта юзера: успешное выполнение', () => {
    store.dispatch(getUserAsync.fulfilled(user, 'test'));
    const updatedUser = {...user, name: `${user.name}Updated`}
    store.dispatch(updateUserAsync.fulfilled(updatedUser, 'test', updatedUser));
    const state = store.getState();
    expect(state.userData).toEqual(updatedUser);
  });

  test('тест получения заказов пользователя: ошибка', () => {
    const error = new Error('Failed to fetch orders');
    store.dispatch(getOrdersAsync.rejected(error, 'test'));
    const state = store.getState();
    expect(state.orders).toEqual([]);
  });

  test('тест получения заказов пользователя: успешное выполнение', () => {
    store.dispatch(getOrdersAsync.fulfilled([order], 'test'));
    const state = store.getState();
    expect(state.orders).toEqual([order]);
  });

});