import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  clearOrderData,
  orderBurgerAsync
} from '../../slices/order/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearIngredients } from '../../slices/burgerConstructor/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );

  const orderModalData = useSelector(
    (state: RootState) => state.order.orderData
  );

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', {
        state: { from: location }
      });
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    console.log('click');
    const orderIngredients: string[] = constructorItems.ingredients.map(
      (ingredient: TConstructorIngredient) => ingredient._id
    );
    orderIngredients.push(constructorItems.bun._id);
    orderIngredients.push(constructorItems.bun._id);
    dispatch(orderBurgerAsync(orderIngredients));
  };
  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
