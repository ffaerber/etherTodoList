import React, { useContext, useEffect, useState } from 'react';
import { EthAddress, Icon, Box, Card, Form, Flex, Input, Select, Field, Button, Text, Checkbox, Radio, Heading, Modal } from 'rimble-ui';

import {
  BrowserRouter as Router,
  useParams,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import { MyContext } from '../../store/store';

import TodoItem from '../../components/Todo/Item';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Transactions from '../../components/Transactions';



export default function ListShow() {
  const { listId } = useParams();
  const { state, dispatch, actions, thunks } = useContext(MyContext);

  const [todoName, setTodoName] = useState('');
  const [list, setList] = useState({ id: listId, name: 'loading' });

  useEffect(() => {
    dispatch(thunks.callList(listId));
  }, [state.contract, listId]);


  useEffect(() => {
    const newList = state.lists.find(x => x.id === listId);
    setList({ ...list, ...newList });
  }, [state.contract, state.lists, listId]);

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(thunks.sendCreateTodo(listId, todoName));
  };

  const handleInput = evt => {
    setTodoName(evt.target.value);
  };

  const handleReset = evt => {
    console.log('handleReset');
  };

  return (
    <Box>

      <Header>
        <Flex mt={2}>
          <Box width={1 / 3}>
            <Button.Outline as={Link} to="/" icon="ArrowBack">
              Lists
            </Button.Outline>
          </Box>

          <Box width={1 / 3} >
            <Heading as={"h2"} textAlign='center' mt={2} >
              {list.title}
            </Heading>
          </Box>
        </Flex>
      </Header>

      <Box pb={1} pt={75}>
        {list.todoIds ? (
          list.todoIds.map(todoId => <TodoItem key={todoId} listId={listId} todoId={todoId} />)
        ) : (
          <div>no todos found</div>
        )}
      </Box>

      <Footer>
          <Form onSubmit={handleSubmit}>
              <Flex>
                <Box width={2 / 3}>
                  <Input type="text" required={true} placeholder="e.g. Bananas" onChange={handleInput} value={todoName} />
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
