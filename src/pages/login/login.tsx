import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../../slices/user/userSlice';
import { AppDispatch, RootState } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const errorText = useSelector((state: RootState) => state.user.loginError);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserAsync({ email, password }));
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
