import React, { useContext, useEffect, useState } from 'react'

import {
  useParams
} from "react-router-dom";

export default function TodoListDetails() {
  const { listId } = useParams();

  return (
    <h3> Details for TodoList: {listId}</h3>
  )
}
