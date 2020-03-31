import types from './actionTypes';

const initialState = {
  web3Context: null,
  loadingWeb3Context: true,
  contract: null,
  loadingContract: true,
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
      return { ...state, web3Context: action.payload, loadingWeb3Context: false };
    }

    case types.LOAD_WEB3_FAIL: {
      return { ...state, web3Context: null, loadingWeb3Context: false };
    }

    case types.LOAD_CONTRACT_SUCCESS: {
      return { ...state, contract: action.payload, loadingContract: false };
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


    case types.CALL_ALL_LIST_SUCCESS: {
      const lists = action.payload
      return { ...state, lists };
    }

    case types.CALL_LIST_SUCCESS: {
      const list = { ...action.payload };
      let lists = state.lists.slice();
      const index = lists.findIndex(l => l.id === list.id)
      lists.splice(index, 1, list);
      return { ...state, lists };
    }

    case types.SEND_CREATE_LIST_SUCCESS: {
      const newList = action.payload.returnValues;
      return {
        ...state,
        lists: [...state.lists, newList]
      };
    }

    case types.CALL_TODO_SUCCESS: {
      const todo = action.payload;
      let todos = state.todos.slice();
      todos.splice(todo.id, 0, todo);
      return { ...state, todos };
    }

    case types.SEND_CREATE_TODO_SUCCESS: {
      const todo = action.payload.returnValues;
      const newList = { ...state.lists.find(x => x.id === todo.listId) };
      newList.todoIds.push(todo.id);
      return {
        ...state,
        lists: state.lists.map(oldList => (oldList.id == newList.id ? { ...oldList, ...newList } : oldList)),
      };
    }



    case types.SEND_UPDATE_TODO_SUCCESS: {
      const { returnValues } = action.payload;
      const newTodo = returnValues;
      const oldTodo = { ...state.todos.find(x => x.id === newTodo.id) };
      return {
        ...state,
        todos: state.todos.map(oldTodo => (oldTodo.id == newTodo.id ? { ...newTodo } : oldTodo)),
      };
    }



    default:
      return state;
  }
};

export { initialState, reducer };
