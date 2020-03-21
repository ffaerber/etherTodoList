import React, { useContext, useEffect, useState } from 'react'
import { MyContext} from '../../store/store'
import { useParams } from "react-router-dom";
import { EthAddress } from "rimble-ui";
import TodoItem from '../Todo/TodoItem'
import {
  Box,
  Card,
  Form,
  Flex,
  Input,
  Select,
  Field,
  Button,
  Text,
  Checkbox,
  Radio,
  Heading,
  Modal
} from "rimble-ui";
import Transaction from '../Transaction';


export default function ListDetail() {
  const { listId } = useParams();
  const { state, actions } = useContext(MyContext)

  const [todoName, setTodoName] = useState("");
  const [list, setList] = useState({id: listId, name: 'loading'});

  useEffect(() => {
    actions.callList(listId)
  }, [state.contract, listId]);

  useEffect(() => {
    const newList = state.lists.find(x => x.id === listId )
    setList({...list, ...newList})
  }, [state.contract, state.lists, listId]);

  const handleSubmit = evt => {
    evt.preventDefault();
    actions.sendCreateTodo(listId, todoName)
  }

  const handleInput = evt => {
    setTodoName(evt.target.value);
  };

  const handleReset = evt => {
    console.log('handleReset')
  };


  return (
      <Box>
        <h1>{list.title}</h1>

        <Form onSubmit={handleSubmit}>
          <Flex>
            <Box width={2/3}>
              <Input
                  type="text"
                  required={true}
                  placeholder="e.g. the thing"
                  onChange={handleInput}
                  value={todoName}
                />
            </Box>
            <Box width={1/3}>
              <Button mt={1} width={1} type="submit">Confirm</Button>
            </Box>
          </Flex>
        </Form>

        <Transaction/>

        {list.todoIds ? (
          list.todoIds.map(todoId => ( <TodoItem listId={listId} todoId={todoId}/> ))
        ) : (
          <div>no todos found</div>
        )}

      </Box>
  )
}
