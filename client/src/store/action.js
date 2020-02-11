import types from './actionTypes'

export const useActions = (state, dispatch) => ({

  injectWeb3: () => {
    dispatch({ type: types.INJECT_WEB3 })
  },

  loadContract: () => {
    if(state.web3Context){
      dispatch({ type: types.LOAD_CONTRACT, payload: {state} })
    }
  },

  loadTotalLists: () => {
    if(state.contract){
      dispatch({ type: types.LOAD_TOTAL_LISTS, payload: {state} })
    }
  },

  loadListIds: () => {
    if(state.contract){
      dispatch({ type: types.LOAD_LIST_IDS, payload: {state} })
    }
  },

  loadListById: (id) => {
    if(state.contract){
      dispatch({ type: types.LOAD_LIST, payload: {state, id} })
    }
  },

  createList: (name) => {
    if(state.contract){
      dispatch({ type: types.CREATE_LIST, payload: {state, name} })
    }
  }




})
