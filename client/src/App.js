import React from 'react';

import { HashRouter } from 'react-router-dom';

import { MyProvider } from './store/store';
import Root from './screens/Root';


export default function App(props) {
  return (
    <MyProvider>
      <HashRouter>
        <Root/>
      </HashRouter>
    </MyProvider>
  );
}
