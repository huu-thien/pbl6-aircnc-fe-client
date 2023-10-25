import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './redux-toolkit/auth.slice';
import propertyReducer from './redux-toolkit/property.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
  },
});

// Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// useAppDispatch dùng khi dispatch 1 async thunk, còn khi dispatch những action thông thường thì dùng AppDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
