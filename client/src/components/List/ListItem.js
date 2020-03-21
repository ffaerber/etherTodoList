import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'rimble-ui';
import { MyContext } from '../../store/store';

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

export default function ListItem({ listId }) {
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
    <Card key={list.id} mt={2}>
      <Link to={`list/${list.id}`}>
        {list.title}
      </Link>
    </Card>
  );
}
