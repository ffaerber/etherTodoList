import { fromInjected } from '@openzeppelin/network';

import {
  loadWeb3Success,
  loadWeb3Fail,
  loadContractSuccess,
  callTotalListsSuccess,
  callListIdsSuccess,
  sendCreateListSuccess,
  sendUpdateListSuccess,
  sendCreateTodoSuccess,
  sendUpdateTodoSuccess,
  callListSuccess,
  callTodoSuccess,
  callAllListSuccess,
  txAdd,
  txRemove,
} from './actions';

export const loadWeb3 = () => (dispatch, state) => {
  return fromInjected()
    .then(web3Context => dispatch(loadWeb3Success(web3Context)))
    .catch(err => dispatch(loadWeb3Fail(err)));
};

export const loadContract = () => async (dispatch, state) => {
  let EtherTodoList = {};
  let deployedNetwork = null;
  try {
    EtherTodoList = require('../../../contracts/EtherTodoList.sol');
  } catch (e) {
    console.log(e);
  }
  await state.web3Context.lib.currentProvider.enable();
  const networkId = await state.web3Context.lib.eth.net.getId();
  if (EtherTodoList.networks) {
    deployedNetwork = EtherTodoList.networks[networkId.toString()];
    if (deployedNetwork) {
      const contract = new state.web3Context.lib.eth.Contract(
        EtherTodoList.abi,
        deployedNetwork && deployedNetwork.address,
      );
      contract.events.allEvents({}, (error, event) => {
        console.log(event);
        switch (event.event) {
          case 'ListCreated':
            dispatch(sendCreateListSuccess(event));
            dispatch(txRemove({ tx: event.transactionHash }));
            break;

          case 'ListUpdated':
            dispatch(sendUpdateListSuccess(event));
            dispatch(txRemove({ tx: event.transactionHash }));
            break;

          case 'TodoCreated':
            dispatch(sendCreateTodoSuccess(event));
            dispatch(txRemove({ tx: event.transactionHash }));
            break;

          case 'TodoUpdated':
            dispatch(sendUpdateTodoSuccess(event));
            dispatch(txRemove({ tx: event.transactionHash }));
            break;

          default:
            console.error('event not known: ', event.event);
            break;
        }
      });
      dispatch(loadContractSuccess(contract));
      return contract;
    }
  }
};

export const callTotalLists = () => async (dispatch, state) => {
  const totalLists = await state.contract.methods.totalLists().call();
  dispatch(callTotalListsSuccess(Number.parseInt(totalLists)));
  return totalLists;
};

export const callListIds = () => async (dispatch, state) => {
  const { contract } = state;
  const { _ } = state.web3Context.lib.utils;
  const listIds = await Promise.all(_.times(state.totalLists, i => contract.methods.listIds(i).call()));
  dispatch(callListIdsSuccess(listIds));
  return listIds;
};


export const callAllList = () => async (dispatch, state) => {
  const { contract } = state;
  const { _ } = state.web3Context.lib.utils;
  const listIds = await Promise.all(_.times(state.totalLists, i => contract.methods.listIds(i).call()));
  const lists = await Promise.all(listIds.map(i => contract.methods.getList(i).call()) );
  dispatch(callAllListSuccess(lists));
  return listIds;
};

export const sendCreateList = title => (dispatch, { web3Context: { accounts }, contract }) => {
  contract.methods.createList(title).send({ from: accounts[0] }, (err, tx) => {
    dispatch(txAdd({ tx }));
  });
  return accounts;
};

export const sendCreateTodo = (listId, name) => (dispatch, { web3Context: { accounts }, contract }) => {
  contract.methods.createTodo(listId, name).send({ from: accounts[0] }, (err, tx) => {
    dispatch(txAdd({ tx }));
  });
  return accounts;
};



export const sendUpdateTodo = todo => (dispatch, { web3Context: { accounts }, contract }) => {
  contract.methods.updateTodo(todo.listId, todo.id, todo.title, todo.done).send({ from: accounts[0] }, (err, tx) => {
    dispatch(txAdd({ tx }));
  });
  return accounts;
};

export const callList = listId => async (dispatch, { contract }) => {
  const list = await contract.methods.getList(listId).call();
  dispatch(callListSuccess(list));
  return list;
};


export const callTodo = (listId, todoId) => async (dispatch, { contract }) => {
  const todo = await contract.methods.getTodo(listId, todoId).call();
  dispatch(callTodoSuccess(todo));
  return todo;
};
