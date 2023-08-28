import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { start } from "./Start";

const reducer = combineReducers({
  start,
});

export type ReducerType = ReturnType<typeof reducer>;

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer,
  middleware,
});

export type AppDispatch = typeof store.dispatch;
export default store;
