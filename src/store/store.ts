import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { collectionsApi } from "./api/collectionsApi";
import { todosApi } from "./api/todosApi";
import authReducer from "./slices/authSlice";
import collectionsReducer from "./slices/collectionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collections: collectionsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      collectionsApi.middleware,
      todosApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
