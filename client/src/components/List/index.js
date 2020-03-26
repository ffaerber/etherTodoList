import React, { useContext, useEffect, useState } from 'react';
import { Flex, Box, Table, Card, Heading, Text, Input, Form } from 'rimble-ui';
import { PublicAddress, Button } from 'rimble-ui';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

import { MyContext } from '../../store/store';

import ListDetail from './ListDetail';
import ListItem from './ListItem';
import Transaction from '../Transaction';
import Footer from '../Footer';

export default function List() {
  const { state, actions } = useContext(MyContext);
  const [listName, setListName] = useState('');

  let match = useRouteMatch();

  useEffect(() => {
    actions.callTotalLists();
  }, [state.contract]);

  useEffect(() => {
    actions.callListIds();
  }, [state.totalLists]);

  const handleSubmit = evt => {
    evt.preventDefault();
    actions.sendCreateList(listName);
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
