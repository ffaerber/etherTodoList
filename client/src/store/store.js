import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducers';
import * as actions from './actions';
import * as thunks from './thunks';

const augmentDispatch = (dispatch, state) => input =>
  input instanceof Function ? input(dispatch, state) : dispatch(input);

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch: augmentDispatch(dispatch, state), actions, thunks }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
