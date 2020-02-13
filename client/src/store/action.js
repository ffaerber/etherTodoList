import types from './actionTypes'

export const useActions = (state, dispatch) => ({



  loadWeb3: () => {
    dispatch({ type: types.LOAD_WEB3 })
  },

  loadContract: () => {
    if(state.web3Context){
      dispatch({ type: types.LOAD_CONTRACT, payload: {state} })
    }
  },




  callTotalLists: () => {
    if(state.contract){
      dispatch({ type: types.CALL_TOTAL_LISTS, payload: {state} })
    }
  },

  callListIds: () => {
    if(state.contract){
      dispatch({ type: types.CALL_LIST_IDS, payload: {state} })
    }
  },

  callList: (id) => {
    if(state.contract){
      dispatch({ type: types.CALL_LIST, payload: {state, id} })
    }
  },



  sendCreateList: (name) => {
    if(state.contract){
      dispatch({ type: types.SEND_CREATE_LIST, payload: {state, name} })
    }
  },

  sendDeleteList: (id) => {
    if(state.contract){
      dispatch({ type: types.SEND_DELETE_LIST, payload: {state, id} })
    }
  }


})
