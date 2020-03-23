import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Field, Form } from 'rimble-ui';
import { MyContext } from '../../store/store';

import {
  Box,
  Flex,
  Card
} from "rimble-ui";


export default function TodoItem({ listId, todoId }) {
  const { actions, state } = useContext(MyContext);
  const [todo, setTodo] = useState({id: todoId});

  useEffect(() => {
    actions.callTodo(listId, todoId);
  }, [ state.lists ]);

  useEffect(() => {
    const findTodo = state.todos.find(x => x.id === todoId)
    const newTodo = {...todo, ...findTodo}
    console.log(newTodo)
    setTodo(newTodo)
  }, [state.todos]);

  const handleCheckbox = e => {
    const newTodo = {...todo, done: !todo.done }
    console.log(newTodo)
    actions.sendUpdateTodo(newTodo)
  };

  return (
    <Card key={todo.id} mt={2}>

        {todo.done ? (
          <Checkbox checked label={todo.title} onClick={handleCheckbox} />
        ) : (
          <Checkbox label={todo.title} onClick={handleCheckbox} />
        )}


    </Card>
  );
}
