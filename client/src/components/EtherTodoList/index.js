import React, { useContext, useEffect, useState } from 'react'
import {
  Flex,
  Box,
  Table,
  Modal,
  Card,
  Heading,
  Text
} from 'rimble-ui';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './EtherTodoList.module.scss';
import { MyContext } from '../../store/store'
import NewTodoListModal from './NewTodoListModal'
import TodoListDetails from './TodoListDetails'
import TodoListItem from './TodoListItem'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import MyModal from '../MyModal';

export default function EtherTodoList() {
  const { state, actions } = useContext(MyContext)
  const [isOpen, setIsOpen] = useState(false);

  let match = useRouteMatch();


  useEffect(() => {
    actions.loadWeb3()
  }, [])

  useEffect(() => {
    actions.loadContract()
  }, [state.web3Context])

  useEffect(() => {
    actions.callTotalLists()
  }, [state.contract])

  useEffect(() => {
    actions.callListIds()
  }, [state.contract])




  const closeModal = e => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  };


  return (
      <div >
        <NewTodoListModal isOpen={isOpen} closeModal={closeModal}/>

        <Flex>
          <Route path={match.path}>
            <Box width={1/4} bg="#f2f2f2">
              <Button onClick={openModal}>New TodoList</Button>
              <ul>{ state.lists.map(list => <TodoListItem list={list}/> ) }</ul>
            </Box>
          </Route>

          <Switch>
            <Route path={`${match.path}/:listId`}>
              <Box width={3/4} >
                <TodoListDetails/>
              </Box>
            </Route>
          </Switch>
        </Flex>
      </div>
  )
}

