import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface feedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: feedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(
      getFeedAsync.fulfilled,
      (state, action: PayloadAction<feedState>) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    );
  }
});

export const getFeedAsync = createAsyncThunk('feed/getFeedAsync', async () => {
  const response = await getFeedsApi();
  return response;
});

export default feedSlice.reducer;
