
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

    case types.SET_LIST_TAMPLATE:
      return { ...state, listTamplate: action.payload };

    case types.LOAD_WEB3_SUCCESS:
      return { ...state, web3Context: action.payload };

    case types.LOAD_CONTRACT_SUCCESS:
      return { ...state, contract: action.payload };

    case types.CALL_TOTAL_LISTS_SUCCESS:
      return { ...state, totalLists: action.payload };

    case types.CALL_LIST_IDS_SUCCESS:
      const listIds = action.payload.filter((value, index, arr) => value > 0)
      const lists = listIds.map(id => {return {id: id}} )
      return { ...state, lists: state.lists.concat(lists) }

    case types.CALL_LIST_SUCCESS:
      const newList = action.payload
      let newState = { ...state }
      newState.lists = state.lists.map(oldList => oldList.id == newList.id? ({...oldList, ...newList}): oldList);
      return newState

    case types.SEND_CREATE_LIST_SUCCESS:
      const {returnValues} = action.payload
      const list = {id: returnValues.listId}
      return { ...state, lists: state.lists.concat(list) }

    default:
      return state;
  }
}

export { initialState, reducer }
