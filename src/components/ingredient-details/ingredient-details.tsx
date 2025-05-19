import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientId = params.id;

  /** TODO: взять переменную из стора */
  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.ingredientsList.find(
      (ingredient: TIngredient) => ingredient._id === ingredientId
    )
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
