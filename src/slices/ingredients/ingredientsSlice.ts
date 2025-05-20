import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface ingredientsState {
  isIngredientsLoading: boolean;
  ingredientsList: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
}

const initialState: ingredientsState = {
  isIngredientsLoading: false,
  ingredientsList: [],
  buns: [],
  mains: [],
  sauces: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsAsync.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(getIngredientsAsync.rejected, (state) => {
      state.isIngredientsLoading = false;
    });
    builder.addCase(
      getIngredientsAsync.fulfilled,
      (state, action: PayloadAction<TIngredient[]>) => {
        state.isIngredientsLoading = false;
        state.ingredientsList = action.payload;
        state.buns = action.payload.filter(
          (ingredient: TIngredient) => ingredient.type === 'bun'
        );
        state.mains = action.payload.filter(
          (ingredient: TIngredient) => ingredient.type === 'main'
        );
        state.sauces = action.payload.filter(
          (ingredient: TIngredient) => ingredient.type === 'sauce'
        );
      }
    );
  }
});

export const getIngredientsAsync = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);
//export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
