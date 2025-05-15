import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface burgerConstructorState {
  bun: TConstructorIngredient;
  ingredients: TConstructorIngredient[];
}

const initialState: burgerConstructorState = {
  bun: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    id: '',
    guid: ''
  },
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        const newIngredient = {
          ...action.payload,
          guid: window.crypto.randomUUID()
        };
        state.ingredients.push(newIngredient);
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient: TConstructorIngredient) =>
          action.payload.guid !== ingredient.guid
      );
    },
    moveIngredientUp: (
      state,
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
      state,
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
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
