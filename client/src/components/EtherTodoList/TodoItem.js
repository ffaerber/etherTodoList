import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'rimble-ui';
import { MyContext } from '../../store/store';


export default function TodoItem({ listId, todo }) {
  const { actions } = useContext(MyContext);
  const { id, body } = todo;

  useEffect(() => {
    actions.callTodo(listId, id);
  }, []);

  return (
    <li key={id}>
      {body}
    </li>
  );
}
