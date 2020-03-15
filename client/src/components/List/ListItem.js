import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'rimble-ui';
import { MyContext } from '../../store/store';

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

export default function ListItem({ list }) {
  const { actions, state } = useContext(MyContext);
  const match = useRouteMatch();

  useEffect(() => {
    if (list.id){
      actions.callList(list.id);
    }
  }, [list]);

  return (
    <li key={list.id}>
      <Link to={`list/${list.id}`}> 
        {list.id} 
        {list.title} 
      </Link>
      {/* <Button onClick={handleClick}>delete</Button> */}
    </li>
  );
}
