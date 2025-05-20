import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  OnlyAuth,
  OnlyUnAuth
} from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { getIngredientsAsync } from '../../slices/ingredients/ingredientsSlice';
import { clearOrderInfo } from '../../slices/order/orderSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(getIngredientsAsync());

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title='Инфомация о заказе'
              onClose={() => {
                dispatch(clearOrderInfo());
                navigate(-1);
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title='Инфомация об ингридиенте'
              onClose={() => {
                navigate(-1);
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title='Инфомация о заказе'
              onClose={() => {
                console.log('test');
                dispatch(clearOrderInfo());
                navigate(-1);
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
