import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import EtherTodoList from './components/EtherTodoList/index.js';
import styles from './App.module.scss';

import {MyProvider} from './store/store';

const App = props => {

  return (
      <Router>
        <MyProvider>

              {/* <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/todolist">todolist</Link>
                  </li>
                </ul>
              </nav> */}

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
