import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface feedState {
  value: number;
}

const initialState: feedState = {
  value: 0
};

const feedSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(incrementAsync.pending, (state) => {
      console.log("pending");
    });
    builder.addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    });
  }
});

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);
export const {increment, decrement, incrementByAmount} = feedSlice.actions;
export default feedSlice.reducer;