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
  const [todoName, setTodoName] = useState("");

  const { listId } = useParams();
  const [list, setList] = useState({});
  const { state, actions } = useContext(MyContext)

  useEffect(() => {
    actions.callList(listId)
  }, [listId]);

  useEffect(() => {
    const stateList = state.lists.find(l => l.id === listId )
    setList(stateList ? {...list, ...stateList} : {})
  }, [state.lists]);




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
        {list.todos ? (
          list.todos.map(todo => ( <TodoItem listId={listId} todo={todo}/> ))
        ) : (
          <div>loading...</div>
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
