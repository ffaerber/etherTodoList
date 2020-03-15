import React, { useContext, useEffect, useState } from 'react';
import { Flex, Box, Table, Card, Heading, Text } from 'rimble-ui';
import { PublicAddress, Button } from 'rimble-ui';

import { MyContext } from '../../store/store';
import Modal from './Modal';
import ListDetail from './ListDetail';
import ListItem from './ListItem';

import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

export default function List() {
  const { state, actions } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

  let match = useRouteMatch();


  useEffect(() => {
    actions.callTotalLists();
  }, [state.contract]);

  useEffect(() => {
    actions.callListIds();
  }, [state.totalLists]);



  const closeModal = e => {
    e.preventDefault();
    setIsOpen(false);
  };

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal} />

        <Route path={match.path}>
          <Button onClick={openModal}>New List</Button>
          {state.lists.map(list => (
            <ListItem list={list} />
          ))}
        </Route>

    </div>
  );
}
