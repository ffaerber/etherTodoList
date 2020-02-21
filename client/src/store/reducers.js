
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

    case types.LOAD_WEB3_SUCCESS:{
      return { ...state, web3Context: action.payload };
    }

    case types.LOAD_CONTRACT_SUCCESS:{
      return { ...state, contract: action.payload };
    }

    case types.CALL_TOTAL_LISTS_SUCCESS:{
      return { ...state, totalLists: action.payload };
    }

    case types.CALL_LIST_IDS_SUCCESS:{
      const listIds = action.payload.filter((value, index, arr) => value > 0)
      const lists = listIds.map(id => {return {id: id}} )
      return { ...state, lists: state.lists.concat(lists) }
    }

    case types.CALL_LIST_SUCCESS:{
      const newList = action.payload
      return { ...state, lists: state.lists.map(oldList => oldList.id == newList.id? ({...oldList, ...newList}): oldList) }
    }


    case types.SEND_CREATE_LIST_SUCCESS:{
      const {returnValues} = action.payload
      const list = {id: returnValues.listId}
      return { ...state, lists: state.lists.concat(list) }
    }


    case types.CALL_TODO_SUCCESS:{
      const {listId, todo} = action.payload
      const list = state.lists.find(list => list.id === listId)
      const newTodos = list.todos.map(oldTodo => oldTodo.id == todo.id? ({...oldTodo, ...todo}): oldTodo)
      const newList = {...list, todos: newTodos }
      return { ...state, lists: state.lists.map(oldList => oldList.id == newList.id? ({...oldList, ...newList}): oldList) }
    }

    case types.SEND_CREATE_TODO_SUCCESS:{
      const {returnValues} = action.payload
      const {listId, todoIndex} = returnValues
      const list = state.lists.find(list => list.id === listId)
      const todo = {id: returnValues.todoIndex}
      const newTodos = list.todos.concat(todo)
      const newList = {...list, todos: newTodos }
      return { ...state, lists: state.lists.map(oldList => oldList.id == newList.id? ({...oldList, ...newList}): oldList) }
    }




    default:
      return state;

  }
}

export { initialState, reducer }
