import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { apodApi } from "../features/apod/apodApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apodApi.reducerPath]: apodApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apodApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
