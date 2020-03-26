import React, { useContext, useEffect, useState } from 'react';
import { Button, Box, Icon, Text, Pill} from 'rimble-ui';
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
    <Link to={`list/${list.id}`}>
      <Box key={list.id} color="black" pl={3} pb={3}>
        <Text fontWeight={"bold"} display={"flex"}>
          <Icon name={"FormatListBulleted"} mr={2} />
          {list.title}
        </Text>
      </Box>
    </Link>
  );
}
