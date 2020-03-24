import React, { useContext, useEffect, useState } from 'react';
import { Flex, Box, Input, Form, Button } from 'rimble-ui';

import { MyContext } from '../../store/store';

import ListItem from './ListItem';

import { Route, useRouteMatch } from 'react-router-dom';
import Transaction from '../Transaction';
import Footer from '../Footer';

export default function List() {
  const { state, dispatch, actions, thunks } = useContext(MyContext);
  const [listName, setListName] = useState('');

  let match = useRouteMatch();

  useEffect(() => {
    dispatch(thunks.callTotalLists());
  }, [state.contract]);

  useEffect(() => {
    if (state.totalLists > 0) {
      dispatch(thunks.callListIds());
    }
  }, [state.totalLists]);

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(thunks.sendCreateList(listName));
  };

  const handleInput = evt => {
    setListName(evt.target.value);
  };

  return (
    <Box>

      <Box pb={70} pt={20}>
        <Route path={match.path}>
          {state.listIds.map(listId => (
            <ListItem key={listId} listId={listId} />
          ))}
        </Route>
      </Box>


      <Footer>
        <Form onSubmit={handleSubmit}>
          <Flex>
            <Box width={2 / 3}>
              <Input type="text" required={true} placeholder="e.g. Groceries" onChange={handleInput} value={listName} />
            </Box>
            <Box width={1 / 3}>
              <Button mt={1} width={1} type="submit">
                Confirm
              </Button>
            </Box>
          </Flex>
        </Form>

        <Transaction />
      </Footer>


    </Box>
  );
}
