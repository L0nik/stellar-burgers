import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

interface burgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: burgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (
        state: burgerConstructorState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, guid: window.crypto.randomUUID() }
      })
    },
    removeIngredient: (
      state: burgerConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient: TConstructorIngredient) =>
          action.payload.guid !== ingredient.guid
      );
    },
    moveIngredientUp: (
      state: burgerConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientToMoveUp = action.payload;
      const index = state.ingredients.findIndex(
        (ingredient: TConstructorIngredient) =>
          ingredient.guid === ingredientToMoveUp.guid
      );
      const ingredientToMoveDown = state.ingredients[index - 1];
      state.ingredients[index - 1] = ingredientToMoveUp;
      state.ingredients[index] = ingredientToMoveDown;
    },
    moveIngredientDown: (
      state: burgerConstructorState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientToMoveDown = action.payload;
      const index = state.ingredients.findIndex(
        (ingredient: TConstructorIngredient) =>
          ingredient.guid === ingredientToMoveDown.guid
      );
      const ingredientToMoveUp = state.ingredients[index + 1];
      state.ingredients[index + 1] = ingredientToMoveDown;
      state.ingredients[index] = ingredientToMoveUp;
    },
    clearIngredients: (state: burgerConstructorState) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearIngredients
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
