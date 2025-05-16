import React from 'react';
import { RootState, useSelector } from '../../services/store';
import {} from '../../slices/user/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedRouteProps): React.JSX.Element => {
  const user = useSelector((state: RootState) => state.user.userData);
  const isAuthChecked = useSelector(
    (state: RootState) => state.user.isAuthChecked
  );
  const location = useLocation();

  // url == "/profile", onlyUnAuth = false, user == null
  // url == "/login", from: "/profile", onlyUnAuth = true, user == null
  // url == "/login", from: "/profile", onlyUnAuth = true, user != null
  // url == "/profile", onlyUnAuth = false, user != null
  // url == "/profile", onlyUnAuth = false, user == null

  if (!isAuthChecked) {
    return <p>Загрузка....</p>;
  }

  if (!onlyUnAuth && !user) {
    // for authorized user, but user is unauthorized
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // for unauthorized user, but user is authorized
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // onlyUnAuth && !user for unauthorized and unauthorized
  // !onlyUnAuth && user for authorized and authorized

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected onlyUnAuth component={component} />;
