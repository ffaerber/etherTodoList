import React, { useContext, useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";


import {
  Box,
  Flex,
  Card
} from "rimble-ui";

import { MyProvider, MyContext } from '../../store/store';


import ListIndex from '../List/index';
import ListDetail from '../List/ListDetail';
import Web3Connect from '../Web3Connect';


export default function EtherTodoList() {
  const { state, actions } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

  let match = useRouteMatch();

  useEffect(() => {
    actions.loadWeb3();
  }, []);

  useEffect(() => {
    actions.loadContract();
  }, [state.web3Context]);


  return (
    <Card maxWidth={"600px"} mx={"auto"} px={[3, 3, 4]}>
      <nav>
        <ul>
          <li>
            <Link to="/info">Info</Link>
          </li>
          <li>
            <Link to="/">All Lists</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path={`/list/:listId`}>
          <ListDetail />
        </Route>
        <Route path="/info">
          <Web3Connect />
        </Route>
        <Route path="/">
          <ListIndex />
        </Route>
      </Switch>
    </Card>
  );
}


