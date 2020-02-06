import React from 'react';
import MyContext from '../../MyContext';
import * as actions from '../../MyActions';

function TodoList({list, getList}) {
  const {id, name} = list

  React.useEffect(() => {
    getList(id)
  }, []);


  return (
    <li key={id}>
      {id}-{name}
    </li>
  )

}

export default TodoList
