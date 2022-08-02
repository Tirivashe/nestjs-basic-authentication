import { configureStore } from "@reduxjs/toolkit";
import { apiAuthSlice } from "./api/apiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    userAuth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiAuthSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
