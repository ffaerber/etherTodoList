import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Web3Info from './components/Web3Info/index.js';
import EtherTodoList from './components/EtherTodoList/index.js';
import styles from './App.module.scss';
import MyProvider from './MyProvider';

const App = props => {

  return (

      <Router>
        <MyProvider>
          <h1>OpenZeppelin Starter Kit</h1>

          <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/todolist">todolist</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/todolist">
            <EtherTodoList/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        </MyProvider>
      </Router>

  );
}

function Home() {
  return <h2>Home</h2>;
}


export default App;
