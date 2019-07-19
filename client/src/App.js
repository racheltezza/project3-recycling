import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Users from './components/Users.js'
import './App.css';
import SingleUser from './components/SingleUser'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Users}/>
          <Route path="/users/:userId" component={SingleUser} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
