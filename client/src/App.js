import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { MyProvider } from './store/store';
import EtherTodoList from './components/EtherTodoList/index';

export default function App(props) {
  return (
    <MyProvider>
      <Router>
        <EtherTodoList />
      </Router>
    </MyProvider>
  );
}
