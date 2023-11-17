import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginResponse, UserType } from '@/@types/user';

// import http from '@/utils/http';

interface AuthState {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
}
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

// create thunk

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUserLogin: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    saveLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setHost: (state) => {
      if(state.user) {
        state.user.isHost = true;
      }
    },
  },
  // extraReducers: (builder) => {},
});
export const { saveUserLogin, saveLogout, setHost } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
