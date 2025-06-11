import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { start } from 'repl';

interface feedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading?: boolean;
  errorMessage?: string;
}

const initialState: feedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  errorMessage: ''
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFeedAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message || '';
    });
    builder.addCase(
      getFeedAsync.fulfilled,
      (state, action: PayloadAction<feedState>) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
        state.errorMessage = '';
      }
    );
  }
});

export const getFeedAsync = createAsyncThunk('feed/getFeedAsync', async () => {
  const response = await getFeedsApi();
  return response;
});

export default feedSlice.reducer;
