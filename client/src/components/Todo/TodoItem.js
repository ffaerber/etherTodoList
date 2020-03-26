import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Field, Form } from 'rimble-ui';
import { MyContext } from '../../store/store';

import { Box, Flex, Card } from 'rimble-ui';

import styles from './TodoItem.module.css';

export default function TodoItem({ listId, todoId }) {
  const { actions, state } = useContext(MyContext);
  const [todo, setTodo] = useState({ id: todoId, done: false });

  useEffect(() => {
    actions.callTodo(listId, todoId);
  }, [state.lists]);

  useEffect(() => {
    const findTodo = state.todos.find(x => x.id === todoId);
    const newTodo = { ...todo, ...findTodo };
    setTodo(newTodo);
  }, [state.todos]);

  const handleCheckbox = e => {
    e.preventDefault();
    const newTodo = { ...todo, done: !todo.done };
    console.log(newTodo);
    actions.sendUpdateTodo(newTodo);
  };

  return (
    <Box mt={2} bg="lightgray" m={2} p={10} fontSize={3} borderRadius={2}>
      <input
        className={styles.checkboxFix}
        id={`todo_checkbox_${todo.id}`}
        type="checkbox"
        checked={todo.done}
        value={todo.done}
        onChange={handleCheckbox}
      />
      <label htmlFor={`todo_checkbox_${todo.id}`}>{todo.title}</label>
    </Box>
  );
}
