import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducers = combineReducers({ user: userReducer });

const persisitConfig = {
  key: "root",
  storage,
  version: 1,
};

const persisitedReducer = persistReducer(persisitConfig, rootReducers);

export const store = configureStore({
  reducer: persisitedReducer,
});

export const persistedStore = persistStore(store);
