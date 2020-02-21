import React, { useContext, useEffect, useState } from 'react';
import { Flex, Box, Table, Modal, Card, Heading, Text } from 'rimble-ui';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './EtherTodoList.module.scss';
import { MyContext } from '../../store/store';
import NewTodoListModal from './NewTodoListModal';
import TodoListDetails from './TodoListDetails';
import TodoListItem from './TodoListItem';

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

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

  useEffect(() => {
    actions.callTotalLists();
  }, [state.contract]);

  useEffect(() => {
    actions.callListIds();
  }, [state.totalLists]);



  const closeModal = e => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div>
      <NewTodoListModal isOpen={isOpen} closeModal={closeModal} />

      <Flex>
        <Route path={match.path}>
          <Box
            p={3}
            width={[0.3, 0.2]}
            bg="#f2f2f2"
          >
            <Button onClick={openModal}>New TodoList</Button>
            <ul>
              {state.lists.map(list => (
                <TodoListItem list={list} />
              ))}
            </ul>
          </Box>
        </Route>

        <Switch>
          <Route path={`${match.path}/:listId`}>
            <Box
              p={3}
              width={[0.7, 0.8]}
              bg="#f2f2f8"
            >
              <TodoListDetails />
            </Box>
          </Route>
        </Switch>
      </Flex>


    </div>
  );
}
