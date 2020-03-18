import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'rimble-ui';
import { MyContext } from '../../store/store';

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

export default function ListItem({ list }) {
  const { actions, state } = useContext(MyContext);
  const match = useRouteMatch();

  useEffect(() => {
    if (list.id && !list.title){
      actions.callList(list.id);
    }
  }, [list]);

  return (
    <Card key={list.id} mt={2}>
      <Link to={`list/${list.id}`}>
        {list.title}
      </Link>
    </Card>
  );
}
