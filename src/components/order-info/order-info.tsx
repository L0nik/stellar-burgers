import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import {
  AppDispatch,
  RootState,
  useSelector,
  useDispatch
} from '../../services/store';
import { getOrderByNumberAsync } from '../../slices/order/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const orderNumber = Number.parseInt(params.number || '');

  useEffect(() => {
    dispatch(getOrderByNumberAsync(orderNumber));
  }, []);

  /** TODO: взять переменные orderData и ingredients из стора */
  const orderData = useSelector((state: RootState) => state.order.orderInfo);

  const ingredients: TIngredient[] = useSelector(
    (state: RootState) => state.ingredients.ingredientsList
  );

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
