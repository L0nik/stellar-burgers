import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface orderState {
  orderData: TOrder | null;
  orderRequest: boolean;
  errorMessage: string;
}

const initialState: orderState = {
  orderData: null,
  orderRequest: false,
  errorMessage: ''
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(orderBugerAsync.pending, (state) => {
      state.orderRequest = true;
      state.errorMessage = '';
    });
    builder.addCase(orderBugerAsync.rejected, (state, action) => {
      state.errorMessage = action.error.message || '';
      state.orderRequest = false;
    });
    builder.addCase(
      orderBugerAsync.fulfilled,
      (state, action: PayloadAction<TOrder>) => {
        state.orderData = action.payload;
        state.orderRequest = false;
        state.errorMessage = '';
      }
    );
  }
});

export const orderBugerAsync = createAsyncThunk(
  'order/orderBugerAsync',
  async (ingredientsId: string[]) => {
    const response = await orderBurgerApi(ingredientsId);
    return response.order;
  }
);

export default orderSlice.reducer;
