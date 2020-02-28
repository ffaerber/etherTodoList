import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Card,
  Form,
  Flex,
  Input,
  Select,
  Field,
  Button,
  Text,
  Checkbox,
  Radio,
  Heading,
  Modal
} from "rimble-ui";

import { MyContext} from '../../store/store'

export default function NewTodoListModal({isOpen, closeModal}) {
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
    <Modal isOpen={isOpen}>
      <Card width={"420px"} p={0}>
        <Button.Text
          icononly
          icon={"Close"}
          color={"moon-gray"}
          position={"absolute"}
          top={0}
          right={0}
          mt={3}
          mr={3}
          onClick={closeModal}
        />

        <Box p={4} mb={3}>
          <Heading.h3>New TodoList</Heading.h3>
        </Box>

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

          <Flex px={4} py={3} borderTop={1} borderColor={"#E8E8E8"} justifyContent={"flex-end"}>
            <Button.Outline onClick={closeModal}>Cancel</Button.Outline>
            <Button ml={3} type="submit">Confirm</Button>
          </Flex>

        </Form>
      </Card>
    </Modal>
  )
}
