
import types from './actionTypes'

const initialState = {
  web3Context: null,
  contract: null,
  loading: false,
  totalLists: 0,
  lists: [],
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case types.INJECT_WEB3_SUCCESS:
      return { ...state, web3Context: action.payload };

    case types.LOAD_CONTRACT_SUCCESS:
      return { ...state, contract: action.payload };

    case types.LOAD_TOTAL_LISTS_SUCCESS:
      return { ...state, totalLists: action.payload };

    case types.LOAD_LIST_IDS_SUCCESS:
      const listIds = action.payload.filter((value, index, arr) => value > 0)
      const lists = listIds.map(id => {return {id: id}} )
      return { ...state, lists: lists }

    case types.LOAD_LIST_SUCCESS:
      const newList = action.payload
      let newState = { ...state }
      newState.lists = state.lists.map(oldList => oldList.id == newList.id? ({...oldList, ...newList}): oldList);
      return newState

    default:
      return state;
  }
}

export { initialState, reducer }
