import React, { useContext, useEffect, useState } from 'react';
import { Button, Box, Icon, Text, Pill} from 'rimble-ui';
import { MyContext } from '../../store/store';

import { Link } from 'react-router-dom';

export default function ListItem({ listId }) {
  const { actions, dispatch, state, thunks } = useContext(MyContext);

  const [list, setList] = useState({ id: listId, title: 'list loading...' });

  useEffect(() => {
    dispatch(thunks.callList(listId));
  }, [listId]);

  useEffect(() => {
    const newList = state.lists.find(x => x.id === listId);
    setList({ ...list, ...newList });
  }, [state.lists]);

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
