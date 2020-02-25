import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'rimble-ui';
import { MyContext } from '../../store/store';


export default function TodoItem({ listId, todoId }) {
  const { actions, state } = useContext(MyContext);

  const [todo, setTodo] = useState({id: todoId, title: 'todo loading...'});

  useEffect(() => {
    actions.callTodo(listId, todoId);
  }, [ state.lists ]);

  useEffect(() => {
    const newTodo = state.todos.find(x => x.id === todoId)
    setTodo({...todo, ...newTodo})
  }, [state.todos]);

  return (
    <li key={todo.id}>
      {todo.id}={todo.title}
    </li>
  );
}
