import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'rimble-ui';
import { MyContext } from '../../store/store';

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

export default function TodoListItem({ list }) {
  const { actions } = useContext(MyContext);
  const match = useRouteMatch();
  const { id, name } = list;

  useEffect(() => {
    actions.callList(id);
  }, [id]);

  const handleClick = e => {
    e.preventDefault();
    actions.sendDeleteList(id);
  };

  return (
    <li key={id}>
      <Link to={`${match.url}/${id}`}> {name} </Link>
      {/* <Button onClick={handleClick}>delete</Button> */}
    </li>
  );
}
