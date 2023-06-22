import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./reducercollection/productSlice";
import detailSlice from "./reducercollection/detailSlice";
import moviePageSlice from "./reducercollection/moviePageSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  movielist: productSlice,
  detail: detailSlice,
  moviePage: moviePageSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
