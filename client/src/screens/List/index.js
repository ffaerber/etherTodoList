import React, { useContext, useEffect, useState } from 'react';
import { Flex, Box, Input, Form, Button } from 'rimble-ui';
import { Route, useRouteMatch } from 'react-router-dom';

import { MyContext } from '../../store/store';

import Transactions from '../../components/Transactions';
import Footer from '../../components/Footer';
import ListItem from '../../components/List/Item';

export default function ListIndex() {
  const { state, dispatch, actions, thunks } = useContext(MyContext);
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  let match = useRouteMatch();

  useEffect(() => {
    dispatch(thunks.callTotalLists());
  }, [state.contract]);


  useEffect(() => {
    if (state.totalLists > 0) {
      dispatch(thunks.callAllList());
    }
  }, [state.totalLists]);




  function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  useEffect(() => {
    setLists(state.lists.sort(compareValues('title', 'desc')))
  }, [state.lists]);

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
          {lists.map(list => (
            <ListItem key={list.id} list={list} />
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

        <Transactions />
      </Footer>


    </Box>
  );
}
