import React, { useContext, useEffect } from 'react';

import { Switch, Route, Link } from 'react-router-dom';

import { Card } from 'rimble-ui';

import { MyContext } from '../../store/store';

import ListIndex from '../List/index';
import ListDetail from '../List/ListDetail';
import Web3Connect from '../Web3Connect';

export default function EtherTodoList() {
  const { state, dispatch, actions, thunks } = useContext(MyContext);

  useEffect(() => {
    dispatch(thunks.loadWeb3());
  }, []);

  useEffect(() => {
    if (state.web3Context) {
      dispatch(thunks.loadContract());
    }
  }, [state.web3Context]);

  if (state.loadingWeb3Context) {
    return 'Loading web3...';
  }
  if (!state.web3Context) {
    return 'Web3 loading failed, please, check network or try again later';
  }
  if (state.loadingContract) {
    return 'Loading contract...';
  }
  if (!state.contract) {
    return 'Contract loading failed, please, check network or try again later';
  }

  return (
    <Box maxWidth={"500px"} mx={"auto"} >

      <Switch>
        <Route path={`/list/:listId`}>
          <ListDetail />
        </Route>
        {/*<Route path="/info">
          <Web3Connect />
        </Route>*/}
        <Route path="/">
          <ListIndex />
        </Route>
      </Switch>

    </Box>
  );
}
