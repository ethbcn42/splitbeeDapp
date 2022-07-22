import { configureStore } from '@reduxjs/toolkit'
import layoutReducer from './slices/layout/layout.slice';
import web3Reducer from './slices/web3/web3.slice';

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    web3: web3Reducer,
  },
})
