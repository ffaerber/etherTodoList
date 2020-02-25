import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'rimble-ui';
import { MyContext } from '../../store/store';

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

export default function TodoListItem({ listId }) {
  const { actions, state } = useContext(MyContext);
  const match = useRouteMatch();

  const [list, setList] = useState({id: listId, title: 'list loading...'});

  useEffect(() => {
    actions.callList(listId);
  }, [listId]);

  useEffect(() => {
    const newList = state.lists.find(x => x.id === listId)
    setList({...list, ...newList})
  }, [state.lists]);

  const handleClick = e => {
    e.preventDefault();
    actions.sendDeleteList(listId);
  };

  return (
    <li key={list.id}>
      <Link to={`${match.url}/${list.id}`}> {list.title} </Link>
      {/* <Button onClick={handleClick}>delete</Button> */}
    </li>
  );
}
