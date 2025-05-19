import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { getOrdersAsync } from '../../slices/user/userSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state: RootState) => state.user.orders);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getOrdersAsync());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
