import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import styles from './App.module.scss';

import List from './components/List/index';

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
                  <List/>
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
