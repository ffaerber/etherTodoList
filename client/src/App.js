import React from 'react';
import EtherTodoList from './components/EtherTodoList/index.js';
import styles from './App.module.scss';
import MyProvider from './MyProvider';

const App = props => {
  return (
    <MyProvider>
      <h1>OpenZeppelin Starter Kit</h1>
      <EtherTodoList/>
    </MyProvider>
  );
}

export default App;
