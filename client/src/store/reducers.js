import types from './actionTypes';

const initialState = {
  web3Context: null,
  contract: null,
  loading: false,
  totalLists: 0,
  listIds: [],
  lists: [],
  todos: [],
  txs: [],
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_WEB3_SUCCESS: {
      return { ...state, web3Context: action.payload };
    }

    case types.LOAD_WEB3_FAIL: {
      return { ...state };
    }

    case types.LOAD_CONTRACT_SUCCESS: {
      return { ...state, contract: action.payload };
    }

    case types.CALL_TOTAL_LISTS_SUCCESS: {
      return { ...state, totalLists: action.payload };
    }

    case types.TX_ADD: {
      const newTx = { ...action.payload };
      if (!newTx.tx) return state;
      const oldTxs = state.txs.slice();
      const txs = [...oldTxs, newTx];
      return { ...state, txs };
    }

    case types.TX_REMOVE: {
      const newTx = { ...action.payload };
      const oldTxs = state.txs.slice();
      const txs = oldTxs.filter(t => t.tx !== newTx.tx);
      return { ...state, txs };
    }

    case types.CALL_LIST_IDS_SUCCESS: {
      const listIds = action.payload;
      return { ...state, listIds };
    }

    case types.CALL_LIST_SUCCESS: {
      const list = { ...action.payload };
      let lists = state.lists.slice();
      lists.splice(list.id, 0, list);
      return { ...state, lists };
    }

    case types.SEND_CREATE_LIST_SUCCESS: {
      const { returnValues } = action.payload;
      const { listId } = returnValues;
      return { ...state, listIds: state.listIds.concat(listId) };
    }

    case types.CALL_TODO_SUCCESS: {
      const { listId, todo } = action.payload;
      const newTodo = { listId, ...todo };
      let todos = state.todos.slice();
      todos.splice(newTodo.id, 0, newTodo);
      return { ...state, todos };
    }

    case types.SEND_CREATE_TODO_SUCCESS: {
      const { returnValues } = action.payload;
      const { listId, todoId } = returnValues;
      const newList = { ...state.lists.find(x => x.id === listId) };
      newList.todoIds.push(todoId);
      return {
        ...state,
        lists: state.lists.map(oldList => (oldList.id == newList.id ? { ...oldList, ...newList } : oldList)),
      };
    }

    default:
      return state;
  }
};

export { initialState, reducer };
