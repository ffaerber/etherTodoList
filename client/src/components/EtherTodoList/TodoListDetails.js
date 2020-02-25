import React, { useContext, useEffect, useState } from 'react'
import { MyContext} from '../../store/store'
import { useParams } from "react-router-dom";
import { EthAddress } from "rimble-ui";
import TodoItem from './TodoItem'
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


export default function TodoListDetails() {
  const { listId } = useParams();
  const { state, actions } = useContext(MyContext)

  const [todoName, setTodoName] = useState("");
  const [list, setList] = useState({id: listId, name: 'loading'});

  useEffect(() => {
    actions.callList(listId)
  }, [listId]);

  useEffect(() => {
    const newList = state.lists.find(x => x.id === listId )
    setList({...list, ...newList})
  }, [state.lists, listId]);

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

    <div>
      <h3>{list.name}</h3>
      <h4> totalTodos: {list.totalTodos}</h4>
      <ul>
        {list.todoIds ? (
          list.todoIds.map(todoId => ( <TodoItem listId={listId} todoId={todoId}/> ))
        ) : (
          <div>no todos found</div>
        )}
      </ul>

      <Form onSubmit={handleSubmit}>

          <Field width={1} >
            <Input
              type="text"
              size="small"
              required={true}
              placeholder="e.g. the thing"
              onChange={handleInput}
              value={todoName}
            />
          </Field>

          <Button ml={3} type="submit">Confirm</Button>

        </Form>

    </div>
  )
}
