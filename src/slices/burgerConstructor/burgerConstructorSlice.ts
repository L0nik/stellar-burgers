import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface burgerConstructorState {
  bun: TIngredient;
  ingredients: TIngredient[];
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
    image_mobile: ''
  },
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    }
  }
});

export const { addIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
