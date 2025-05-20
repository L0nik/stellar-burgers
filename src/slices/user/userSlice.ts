import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi,
  getOrdersApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

interface userState {
  userData: TUser | null;
  isAuthChecked: boolean;
  loginError: string;
  orders: TOrder[];
}

const initialState: userState = {
  userData: null,
  isAuthChecked:
    getCookie('accessToken') || localStorage.getItem('refreshToken')
      ? true
      : false,
  loginError: '',
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.rejected, (state, action) => {
      state.userData = null;
    });
    builder.addCase(
      getUserAsync.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.userData = action.payload;
      }
    );
    builder.addCase(
      loginUserAsync.fulfilled,
      (state, action: PayloadAction<TAuthResponse>) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      }
    );
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.userData = null;
      state.isAuthChecked = false;
      state.loginError = action.error.message || '';
    });
    builder.addCase(
      registerUserAsync.fulfilled,
      (state, action: PayloadAction<TAuthResponse>) => {
        state.userData = action.payload.user;
        state.loginError = '';
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      }
    );
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.userData = null;
      console.log(action.error.message);
    });
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.userData = null;
      state.isAuthChecked = false;
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    });
    builder.addCase(logoutUserAsync.rejected, (state, action) => {
      console.log(action.error.message);
    });
    builder.addCase(
      updateUserAsync.fulfilled,
      (state, action: PayloadAction<TUser>) => {
        state.userData = action.payload;
      }
    );
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      console.log(action.error.message);
    });
    builder.addCase(getOrdersAsync.rejected, (state: userState, action) => {
      state.orders = [];
    });
    builder.addCase(
      getOrdersAsync.fulfilled,
      (state: userState, action: PayloadAction<TOrder[]>) => {
        state.orders = action.payload;
      }
    );
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
    return response;
  }
);

export const registerUserAsync = createAsyncThunk(
  'user/registerUserAsync',
  async (registerData: TRegisterData) => {
    const response = await registerUserApi(registerData);
    return response;
  }
);

export const logoutUserAsync = createAsyncThunk(
  'user/logoutUserAsync',
  async () => {
    await logoutApi();
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUserAsync',
  async (user: Partial<TRegisterData>) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);

export const getOrdersAsync = createAsyncThunk(
  'order/getOrdersAsync',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export default userSlice.reducer;
