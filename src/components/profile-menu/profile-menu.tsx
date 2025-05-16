import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store';
import { logoutUserAsync } from '../../slices/user/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
