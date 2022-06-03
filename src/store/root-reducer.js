import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";

export const rootReducer = combineReducers({
  // Keys: Name of the reducer slice --- value: The actual reducer function
  user: userReducer,
  categories: categoriesReducer,
});
