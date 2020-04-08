import React, { useContext, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Card, Box } from 'rimble-ui';
import { MyContext } from '../store/store';

import ListIndex from './List/index';
import ListShow from './List/show';
import Web3Connect from '../components/Web3Connect';

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

        <Route path="/info">
          <Web3Connect />
        </Route>

        <Route path={`/list/:listId`}>
          <ListShow />
        </Route>

        <Route path="/">
          <ListIndex />
        </Route>

      </Switch>
    </Box>
  );
}
