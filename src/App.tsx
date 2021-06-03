import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Details from './components/Details';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <Switch>
          <Route path="/:id">
            <Details />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
