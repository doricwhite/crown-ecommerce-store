import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(
  rootReducer,
  undefined,
  composedEnhancers
);
