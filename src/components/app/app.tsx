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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getIngredientsAsync } from '../../slices/ingredients/ingredientsSlice';
import { clearOrderInfo } from '../../slices/order/orderSlice';
import { getUserAsync } from '../../slices/user/userSlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(
    (state: RootState) => state.user.isAuthChecked
  );
  dispatch(getIngredientsAsync());

  if (isAuthChecked) {
    dispatch(getUserAsync());
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
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
      </Routes>
      <Routes>
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
