import { describe, expect, test, beforeEach } from '@jest/globals';

import { combineSlices, configureStore } from '@reduxjs/toolkit';
import ingredientsSliceReducer, { ingredientsSlice } from '../../slices/ingredients/ingredientsSlice';
import burgerConstructorSliceReducer, { burgerConstructorSlice } from '../../slices/burgerConstructor/burgerConstructorSlice';
import feedSliceReducer, { feedSlice } from '../../slices/feed/feedSlice';
import userSliceReducer, { userSlice } from '../../slices/user/userSlice';
import orderSliceReducer, { orderSlice } from '../../slices/order/orderSlice';

describe("Тест rootReducer", () => {

  test("Тест инициализации rootReducer", () => {

    const rootReducer = combineSlices(
      ingredientsSlice,
      burgerConstructorSlice,
      feedSlice,
      userSlice,
      orderSlice
    );

    const store = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== 'production'
    });

    const state = store.getState();

    expect(state.burgerConstructor).toEqual(burgerConstructorSliceReducer(undefined, {type: 'test_type'}));
    expect(state.feed).toEqual(feedSliceReducer(undefined, {type: 'test_type'}));
    expect(state.ingredients).toEqual(ingredientsSliceReducer(undefined, {type: 'test_type'}));
    expect(state.order).toEqual(orderSliceReducer(undefined, {type: 'test_type'}));
    expect(state.user).toEqual(userSliceReducer(undefined, {type: 'test_type'}));
  })

});