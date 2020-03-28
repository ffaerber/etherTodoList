import React from 'react';

import { HashRouter } from 'react-router-dom';

import { MyProvider } from './store/store';
import EtherTodoList from './components/EtherTodoList/index';


export default function App(props) {
  return (
    <MyProvider>
      <HashRouter>
        <EtherTodoList />
      </HashRouter>
    </MyProvider>
  );
}
