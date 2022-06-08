import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  // Keys: Name of the reducer slice --- value: The actual reducer function
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
