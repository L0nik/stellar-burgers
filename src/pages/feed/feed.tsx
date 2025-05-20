import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getFeedAsync } from '../../slices/feed/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state: RootState) => state.feed.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetFeeds();
  }, []);

  const handleGetFeeds = () => {
    dispatch(getFeedAsync());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
