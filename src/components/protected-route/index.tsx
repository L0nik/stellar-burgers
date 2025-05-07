import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthorized = false;

  if (!isAuthorized) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
