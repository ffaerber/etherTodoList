import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Field, Form, Box, Flex, Card, Text, Icon } from 'rimble-ui';
import { MyContext } from '../../../store/store';

export default function TodoItem({ listId, todoId }) {
  const { state, dispatch, actions, thunks } = useContext(MyContext);
  const [todo, setTodo] = useState({ id: todoId, done: false });


  useEffect(() => {
    dispatch(thunks.callTodo(listId, todoId));
  }, [state.lists]);

  useEffect(() => {
    const findTodo = state.todos.find(x => x.id === todoId);
    const newTodo = { ...todo, ...findTodo };
    setTodo(newTodo);
  }, [state.todos]);

  const handleCheckbox = e => {
    e.preventDefault();
    const newTodo = { ...todo, done: !todo.done };
    dispatch(thunks.sendUpdateTodo(newTodo));
  };

  return (
    <Box bg="lightgray"  mb={1} px={9} borderRadius={1} id={`todo_checkbox_${todo.id}`}>
      <Button.Text onClick={handleCheckbox} >
        <Text display={"flex"} color="black">
          <Icon name={todo.done ? "RadioButtonChecked" : "RadioButtonUnchecked"} mr={2} />
          {todo.title}
        </Text>
      </Button.Text>
    </Box>
  );
}
