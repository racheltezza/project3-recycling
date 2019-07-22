import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users.js'
import './App.css';
import SingleUser from './components/SingleUser'
import RecyclingItems from './components/RecyclingItems'
import SingleRecyclingItem from './components/SingleRecyclingItem.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Users}/>
          <Route path="/users/:userId/recyclingItems/:itemId" component={SingleRecyclingItem} />
          <Route path="/users/:userId/recyclingItems" component={RecyclingItems} />
          <Route path="/users/:userId" component={SingleUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
