import { useContext} from 'react'
import types from './actionTypes'
import { fromInjected, fromConnection } from '@openzeppelin/network';
import { solidityLoaderOptions } from '../../config/webpack';
const hotLoaderDisabled = solidityLoaderOptions.disabled;


export const applyMiddleware = dispatch => async action =>  {

  switch (action.type) {

    case types.LOAD_WEB3: {
      return await fromInjected()
        .then(web3Context => dispatch({
          type: types.LOAD_WEB3_SUCCESS,
          payload: web3Context }))
        .catch(err => dispatch({
          type: types.LOAD_WEB3_FAIL,
          payload: err }))
          break
    }

    case types.LOAD_CONTRACT: {
      const {state} = action.payload
      let TodoList = {};
      let deployedNetwork = null;
      try {
        TodoList = require('../../../contracts/TodoList.sol');
      } catch (e) {
        console.log(e);
      }
      const networkId = await state.web3Context.lib.eth.net.getId();
      if(TodoList.networks){
        deployedNetwork = TodoList.networks[networkId.toString()];
        if (deployedNetwork) {
          const contract = new state.web3Context.lib.eth.Contract(TodoList.abi, deployedNetwork && deployedNetwork.address);
          contract.events.allEvents({}, (error, event) => {
            switch (event.event) {
              case "ListCreated": dispatch({ type: types.SEND_CREATE_LIST_SUCCESS, payload: event })
            }
          })
          dispatch({ type: types.LOAD_CONTRACT_SUCCESS, payload: contract})
          return contract
        }
      }
      break
    }

    case types.CALL_TOTAL_LISTS: {
      const {state} = action.payload
      const totalLists = await state.contract.methods.getTotalLists().call();
      dispatch({ type: types.LOAD_TOTAL_LISTS_SUCCESS, payload: totalLists})
      return totalLists
      break
    }

    case types.CALL_LIST_IDS: {
      const {state} = action.payload
      const listIds = await state.contract.methods.getListIds(1,50).call();
      dispatch({ type: types.CALL_LIST_IDS_SUCCESS, payload: listIds})
      return listIds
      break
    }

    case types.CALL_LIST: {
      const {state, id} = action.payload
      const list = await state.contract.methods.getList(id).call();
      dispatch({ type: types.CALL_LIST_SUCCESS, payload: list})
      return list
      break
    }

    case types.SEND_CREATE_LIST: {
      const {state, name} = action.payload
      const {web3Context, contract, listTamplate} = state
      const {accounts} = web3Context

      contract.methods
        .createList(name)
        .send({ from: accounts[0] }, (err, tx) => {
          dispatch({ type: types.SEND_CREATE_LIST_STARTED, payload: {tx} })
        })
      return accounts
      break
    }


    case types.SEND_DELETE_LIST: {
      const {state, id} = action.payload
      const {accounts} = state.web3Context

      state.contract.methods
        .deleteList(id)
        .send({ from: accounts[0] }, (err, tx) => {
          dispatch({ type: types.SEND_DELETE_LIST_STARTED, payload: {tx} })
        })

      return accounts
      break
    }



    default: dispatch(action)
} }
