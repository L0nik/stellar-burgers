import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { TIngredient } from '@utils-types';
import { useDispatch } from '../../services/store';
import { addIngredient } from '../../slices/burgerConstructor/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = (ingredient: TIngredient) => {
      dispatch(
        addIngredient({
          ...ingredient,
          id: ingredient._id
        })
      );
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={() => {
          handleAdd(ingredient);
        }}
      />
    );
  }
);
