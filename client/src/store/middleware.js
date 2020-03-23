import types from './actionTypes';
import { fromInjected, fromConnection } from '@openzeppelin/network';
import { solidityLoaderOptions } from '../../config/webpack';
const hotLoaderDisabled = solidityLoaderOptions.disabled;

export const applyMiddleware = dispatch => async action => {
  switch (action.type) {
    case types.LOAD_WEB3: {
      return await fromInjected()
        .then(web3Context =>
          dispatch({
            type: types.LOAD_WEB3_SUCCESS,
            payload: web3Context,
          }),
        )
        .catch(err =>
          dispatch({
            type: types.LOAD_WEB3_FAIL,
            payload: err,
          }),
        );
    }

    case types.LOAD_CONTRACT: {
      const { state } = action.payload;
      let EtherTodoList = {};
      let deployedNetwork = null;
      try {
        EtherTodoList = require('../../../contracts/EtherTodoList.sol');
      } catch (e) {
        console.log(e);
      }
      await state.web3Context.lib.currentProvider.enable()
      const networkId = await state.web3Context.lib.eth.net.getId();
      if (EtherTodoList.networks) {
        deployedNetwork = EtherTodoList.networks[networkId.toString()];
        if (deployedNetwork) {
          const contract = new state.web3Context.lib.eth.Contract(
            EtherTodoList.abi,
            deployedNetwork && deployedNetwork.address,
          );
          contract.events.allEvents({}, (error, event) => {
            console.log(event)
            switch (event.event) {
              case 'ListCreated':
                dispatch({ type: types.SEND_CREATE_LIST_SUCCESS, payload: event });
                dispatch({ type: types.TX_REMOVE, payload: { tx: event.transactionHash } });
                break;

              case 'ListUpdated':
                dispatch({ type: types.SEND_UPDATE_LIST_SUCCESS, payload: event });
                dispatch({ type: types.TX_REMOVE, payload: { tx: event.transactionHash } });
                break;

              case 'TodoCreated':
                dispatch({ type: types.SEND_CREATE_TODO_SUCCESS, payload: event });
                dispatch({ type: types.TX_REMOVE, payload: { tx: event.transactionHash } });
                break;

              case 'TodoUpdated':
                dispatch({ type: types.SEND_UPDATE_TODO_SUCCESS, payload: event });
                dispatch({ type: types.TX_REMOVE, payload: { tx: event.transactionHash } });
                break;

              default:
                console.error('event not known: ', event.event);
                break;
            }
          });
          dispatch({ type: types.LOAD_CONTRACT_SUCCESS, payload: contract });
          return contract;
        }
      }
      break;
    }

    case types.CALL_TOTAL_LISTS: {
      const { state } = action.payload;
      const totalLists = await state.contract.methods.totalLists().call();
      dispatch({ type: types.CALL_TOTAL_LISTS_SUCCESS, payload: totalLists });
      return totalLists;
    }

    case types.CALL_LIST_IDS: {
      const { state } = action.payload;
      const { contract } = state;
      const { _ } = action.payload.state.web3Context.lib.utils;
      const listIds = await Promise.all(_.times(state.totalLists, i => contract.methods.listIds(i).call()));
      dispatch({ type: types.CALL_LIST_IDS_SUCCESS, payload: listIds });
      return listIds;
    }





    case types.CALL_LIST: {
      const { state, id } = action.payload;
      const { contract } = state;
      const list = await contract.methods.getList(id).call();
      dispatch({ type: types.CALL_LIST_SUCCESS, payload: list });
      return list;
    }

    case types.SEND_CREATE_LIST: {
      const { state, title } = action.payload;
      const { web3Context, contract } = state;
      const { accounts } = web3Context;
      contract.methods.createList(title).send({ from: accounts[0] }, (err, tx) => {
        dispatch({ type: types.SEND_CREATE_LIST_STARTED, payload: { tx, title } });
        dispatch({ type: types.TX_ADD, payload: { tx } });
      });
      return accounts;
    }



    case types.CALL_TODO: {
      const { state, listId, todoId } = action.payload;
      const todo = await state.contract.methods.getTodo(listId, todoId).call();
      dispatch({ type: types.CALL_TODO_SUCCESS, payload: {listId, todo} });
      return todo;
    }


    case types.SEND_CREATE_TODO: {
      const { state, listId, name } = action.payload;
      const { web3Context, contract, listTamplate } = state;
      const { accounts } = web3Context;
      contract.methods.createTodo(listId, name).send({ from: accounts[0] }, (err, tx) => {
        dispatch({ type: types.TX_ADD, payload: { tx } });

      });
      return name;
    }


    case types.SEND_UPDATE_TODO: {
      const { state, todo } = action.payload;
      const {
        web3Context: { accounts },
        contract,
      } = state;
      contract.methods.updateTodo( todo.listId, todo.id, todo.title, todo.done ).send({ from: accounts[0] }, (err, tx) => {
        dispatch({ type: types.TX_ADD, payload: { tx } });
      });
      return todo;
    }


    default:
      dispatch(action);
  }
};
