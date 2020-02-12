import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Form,
  Input,
  Select,
  Field,
  Button,
  Text,
  Checkbox,
  Radio
} from "rimble-ui";

import { MyContext} from '../../store/store'

export default function NewTodoList() {
  const { state, actions } = useContext(MyContext)

  const [listName, setListName] = useState("");

  const handleSubmit = evt => {
    evt.preventDefault();
    actions.sendCreateList(listName)
  }

  const handleInput = evt => {
    setListName(evt.target.value);
  };

  const handleReset = evt => {
    console.log('handleReset')
  };

  return (

    <Form onSubmit={handleSubmit}>

      <Field width={1} >
        <Input
          type="text"
          size="small"
          required={true}
          placeholder="e.g. Best Movies"
          onChange={handleInput}
          value={listName}
        />
      </Field>

      <Button type="submit" size="small">
        Submit
      </Button>

    </Form>
  )
}
