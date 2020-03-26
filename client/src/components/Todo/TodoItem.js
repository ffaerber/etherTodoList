import React, { useContext, useEffect, useState } from 'react';
import { Button, Checkbox, Field, Form, Box, Flex, Card, Text, Icon } from 'rimble-ui';
import { MyContext } from '../../store/store';

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
    <Box bg="lightgray"  m={1} p={10} borderRadius={1} id={`todo_checkbox_${todo.id}`}>
      <Button.Text onClick={handleCheckbox} >
        <Text display={"flex"} color="black">
          <Icon name={todo.done ? "RadioButtonChecked" : "RadioButtonUnchecked"} mr={2} />
          {todo.title}
        </Text>
      </Button.Text>
    </Box>
  );
}
