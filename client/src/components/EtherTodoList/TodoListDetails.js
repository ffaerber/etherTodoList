import React, { useContext, useEffect, useState } from 'react'
import { MyContext} from '../../store/store'
import { useParams } from "react-router-dom";

export default function TodoListDetails() {
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

  return (
    <div>
      <h3> ID: {list.id}</h3>
      <h3> Details for TodoList: {list.name}</h3>
    </div>
  )
}
