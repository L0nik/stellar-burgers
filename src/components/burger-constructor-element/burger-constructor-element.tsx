import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import {
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient
} from '../../slices/burgerConstructor/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMoveDown = (ingredient: TConstructorIngredient) => {
      dispatch(moveIngredientDown(ingredient));
    };

    const handleMoveUp = (ingredient: TConstructorIngredient) => {
      dispatch(moveIngredientUp(ingredient));
    };

    const handleClose = (ingredient: TConstructorIngredient) => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={() => {
          handleMoveUp(ingredient);
        }}
        handleMoveDown={() => {
          handleMoveDown(ingredient);
        }}
        handleClose={() => {
          handleClose(ingredient);
        }}
      />
    );
  }
);
