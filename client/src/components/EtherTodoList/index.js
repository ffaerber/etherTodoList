import React, { useState, useEffect } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './EtherTodoList.module.scss';
import { solidityLoaderOptions } from '../../../config/webpack';
import MyContext from '../../MyContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function EtherTodoList() {
  const {contract, getList, totalLists, lists, createList } = React.useContext(MyContext);
  let match = useRouteMatch();

  const hotLoaderDisabled = solidityLoaderOptions.disabled;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createList(listName)
  }

  const [listName, setListName] = useState("");

  return (
      <div >
        <h1>TodoList</h1>
        <div>{totalLists}</div>

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
            <List getList={getList}/>
          </Route>
          <Route path={match.path}>
            <ul>{ lists.map(list => <TodoList list={list} getList={getList}/> ) }</ul>
          </Route>
        </Switch>
      </div>
  )
}

function List({getList}) {
  const { listId } = useParams();

  return (
    <h3>Requested list ID: {listId}</h3>
  )
}


function TodoList({list, getList}) {
  const match = useRouteMatch();
  const {id, name} = list

  React.useEffect(() => {
    getList(id)
  }, []);

  return (
    <li key={id}>
      <Link to={`${match.url}/${id}`}>
        {id}-{name}
      </Link>
    </li>
  )

}
