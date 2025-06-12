import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface orderState {
  orderData: TOrder | null;
  orderRequest: boolean;
  errorMessage: string;
  orderInfo: TOrder | null;
}

const initialState: orderState = {
  orderData: null,
  orderRequest: false,
  errorMessage: '',
  orderInfo: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state: orderState) => {
      state.orderData = null;
    },
    clearOrderInfo: (state: orderState) => {
      state.orderInfo = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurgerAsync.pending, (state: orderState) => {
      state.orderRequest = true;
      state.errorMessage = '';
    });
    builder.addCase(orderBurgerAsync.rejected, (state: orderState, action) => {
      state.errorMessage = action.error.message || '';
      state.orderRequest = false;
    });
    builder.addCase(
      orderBurgerAsync.fulfilled,
      (state: orderState, action: PayloadAction<TOrder>) => {
        state.orderData = action.payload;
        state.orderRequest = false;
        state.errorMessage = '';
      }
    );
    builder.addCase(
      getOrderByNumberAsync.fulfilled,
      (state: orderState, action: PayloadAction<TOrder>) => {
        state.orderInfo = action.payload;
      }
    );
  }
});

export const orderBurgerAsync = createAsyncThunk(
  'order/orderBurgerAsync',
  async (ingredientsId: string[]) => {
    const response = await orderBurgerApi(ingredientsId);
    console.log(JSON.stringify(response));
    return response.order;
  }
);

export const getOrderByNumberAsync = createAsyncThunk(
  'order/getOrderByNumberAsync',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0];
  }
);

export const { clearOrderData, clearOrderInfo } = orderSlice.actions;
export default orderSlice.reducer;
