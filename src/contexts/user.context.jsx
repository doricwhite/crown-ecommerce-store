/******* IMPORTS *******/
import { createContext, useEffect, useReducer } from "react";

// Firebase utils
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Reducer utils
import { createAction } from "../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "../store/user/user.types";

// Actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// Reducer switch types
// export const USER_ACTION_TYPES = {
//   SET_CURRENT_USER: "SET_CURRENT_USER",
// };

// Reducer
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

// Initial User State
const INITIAL_STATE = {
  currentUser: null,
};

// The actual component
export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);

  // Use Reducer
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    // dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
