import logger from "redux-logger";
import {
  compose,
  legacy_createStore,
  applyMiddleware,
  Middleware,
} from "redux";

import { persistStore, persistReducer, PersistConfig } from "redux-persist";

import storage from "redux-persist/lib/storage";
// import { loggerMiddleware } from "./middleware/logger";

/* Redux Saga */
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

// Root State
export type RootState = ReturnType<typeof rootReducer>;

// Extend window
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

/* Redux-Persist */
const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  // blacklist: ["user"],
  whitelist: ["cart"],
};

// Redux Saga Middleware
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middleware
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware, // redux-saga
].filter((middleware): middleware is Middleware => Boolean(middleWares)); // Only show logs when in development

//Compose modified to you Redux DevTools chrome extension
const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const composedEnhancers = compose(applyMiddleware(...middleWares));
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(
  // rootReducer,
  persistedReducer,
  undefined,
  composedEnhancers
);

// Run saga
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);