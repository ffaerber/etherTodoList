import React, { useContext, useEffect, useState } from 'react'
import { Flex, Box, Table} from 'rimble-ui';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './EtherTodoList.module.scss';
import { MyContext } from '../../store/store'
import NewTodoList from './NewTodoList'
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

export default function EtherTodoList() {
  const { state, actions } = useContext(MyContext)

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



  return (
      <div >
        <Flex>

          <Route path={match.path}>
            <Box width={1/4} bg="#f2f2f2">
              <ul>{ state.lists.map(list => <TodoListItem list={list}/> ) }</ul>
              <NewTodoList/>
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

