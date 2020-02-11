import React, { useContext, useEffect, useState } from 'react'
import { PublicAddress, Button } from 'rimble-ui';
import styles from './EtherTodoList.module.scss';
import { MyContext} from '../../store/store'

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
    actions.injectWeb3()
  }, [])

  useEffect(() => {
    actions.loadContract()
  }, [state.web3Context])

  useEffect(() => {
    actions.loadTotalLists()
  }, [state.contract])

  useEffect(() => {
    actions.loadListIds()
  }, [state.contract])



  const handleSubmit = (evt) => {
    evt.preventDefault();
    actions.createList(listName)
  }

  const [listName, setListName] = useState("");

  return (
      <div >
        <h1>TodoList</h1>
        <div>{state.totalLists}</div>

        <form onSubmit={handleSubmit}>
          <label>
            List Name:
          <input
            type="text"
            value={listName}
            onChange={e => setListName(e.target.value)}
          />
          </label>
          <input type="submit" value="Submit" />
        </form>


        <Switch>
          <Route path={`${match.path}/:listId`}>
            <List/>
          </Route>
          <Route path={match.path}>
            <ul>{ state.lists.map(list => <TodoList list={list}/> ) }</ul>
          </Route>
        </Switch>
      </div>
  )
}

function List() {
  const { listId } = useParams();

  return (
    <h3>Requested list ID: {listId}</h3>
  )
}


function TodoList({list}) {
  const { actions } = useContext(MyContext)
  const match = useRouteMatch();
  const {id, name} = list

  useEffect(() => {
    actions.loadListById(id)
  }, []);

  return (
    <li key={id}>
      <Link to={`${match.url}/${id}`}>
        {name}
      </Link>
    </li>
  )

}
