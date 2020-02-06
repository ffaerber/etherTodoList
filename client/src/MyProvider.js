import React from 'react';
import MyContext from './MyContext';
import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/react';


const initialState = {
  totalLists: 0,
  listIds: [],
  list: []
};

const actions = {
  INIT: "INIT",
  SET_TOTAL_LISTS: "SET_TOTAL_LISTS",
  SET_LIST_IDS: "SET_LIST_IDS",
  SET_LIST: "SET_LIST"
};


function reducer(state, action) {
  switch (action.type) {

    case actions.INIT:
      return { ...state, contract: action.payload };

    case actions.SET_TOTAL_LISTS:
      return { ...state, totalLists: action.payload };

    case actions.SET_LIST_IDS:
      return {
        ...state,
        listIds: action.payload.filter((value, index, arr) => value > 0)
      }

    case actions.SET_LIST:
      return { ...state, listIds: action.payload };

    default:
      return state;
  }
}



export default function MyProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const web3Context = useWeb3Injected();
  const { accounts, networkId, networkName, providerName, lib, connected } = web3Context;

  React.useEffect(() => {
    let TodoList = {};
    let deployedNetwork = null;
    const fetchContract = async () => {
      try {
        TodoList = require('../../contracts/TodoList.sol');
      } catch (e) {
        console.log(e);
      }
      const networkId = await web3Context.lib.eth.net.getId();
      if(TodoList.networks){
        deployedNetwork = TodoList.networks[networkId.toString()];
        if (deployedNetwork) {
          const todoList = new web3Context.lib.eth.Contract(TodoList.abi, deployedNetwork && deployedNetwork.address);
          dispatch({ type: actions.INIT, payload: todoList})
        }
      }
    }
    fetchContract()
  }, []);


  const getTotalLists = async () => {
    if(state.contract){
      const todoLists = await state.contract.methods.getTotalLists().call();
      dispatch({ type: actions.SET_TOTAL_LISTS, payload: todoLists})
    }
  }
  React.useEffect(() => {
    getTotalLists()
  }, [state.contract]);


  const getListIds = async () => {
    if(state.contract){
      const listIds = await state.contract.methods.getListIds(1,10).call();
      dispatch({ type: actions.SET_LIST_IDS, payload: listIds})
    }
  }
  React.useEffect(() => {
    getListIds()
  }, [state.contract]);


  // const getList = async (listId) => {
  //   if(state.contract){
  //     const list = await state.contract.methods.getList(listId).call();
  //     dispatch({ type: actions.SET_LIST, value })

  //   }
  // }

  const createList = (name) => {
    if(state.contract){
      state.contract.methods
        .createList(name)
        .send({ from: accounts[0] }, (err, result) => {
          dispatch({ type: actions.SET_RATING, value })
        })
    }
  }

  const value = {
    totalLists: state.totalLists,
    listIds: state.listIds,
    createList: value => {
      state.contract.methods
        .createList(value)
        .send({ from: accounts[0] }, (err, result) => {
          dispatch({ type: actions.SET_RATING, value })
        })
    }


  };

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}
