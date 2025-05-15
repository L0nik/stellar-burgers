import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { removeIngredient } from '../../slices/burgerConstructor/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleMoveDown = () => {};

    const handleMoveUp = () => {};

    const handleClose = (ingredient: TConstructorIngredient) => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={() => {
          handleClose(ingredient);
        }}
      />
    );
  }
);
