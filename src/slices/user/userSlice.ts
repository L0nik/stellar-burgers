import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie } from '../../utils/cookie';

interface userState {
  userData: TUser | null;
  isAuthChecked: boolean;
}

const initialState: userState = {
  userData: null,
  isAuthChecked: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserAsync.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.userData = action.payload;
      }
    );
    builder.addCase(
      loginUserAsync.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.userData = action.payload;
      }
    );
    builder.addCase(loginUserAsync.rejected, (state) => {
      state.userData = null;
    });
    builder.addCase(
      registerUserAsync.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.userData = action.payload;
      }
    );
    builder.addCase(registerUserAsync.rejected, (state) => {
      state.userData = null;
    });
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.userData = null;
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    });
    builder.addCase(logoutUserAsync.rejected, (state) => {
      console.log('failed to logout');
    });
  }
});

export const getUserAsync = createAsyncThunk('user/getUserAsync', async () => {
  const response = await getUserApi();
  return response.user;
});

export const loginUserAsync = createAsyncThunk(
  'user/loginUserAsync',
  async (loginData: TLoginData) => {
    const response = await loginUserApi(loginData);
    return response.user;
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/registerUserAsync',
  async (registerData: TRegisterData) => {
    const response = await registerUserApi(registerData);
    return response.user;
  }
);

export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async () => {
    await logoutApi();
  }
);

export default userSlice.reducer;
