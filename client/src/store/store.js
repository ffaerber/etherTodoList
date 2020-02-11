
import React, { createContext, useReducer } from 'react'
import { reducer, initialState } from './reducers'
import { useActions } from './action'
import { applyMiddleware } from './middleware'

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const middleware = applyMiddleware(dispatch)
  const actions = useActions(state, middleware)

  return (
    <MyContext.Provider value={{ state, actions }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyProvider }
