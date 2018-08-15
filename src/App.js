import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'

import Home from './Components/Home'
import Random from './Components/Random'

const App = () => (
  <div className="App">
    <Header/>
    <Page/>
  </div>
)

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/random'>Random</Link></li>
      </ul>
    </nav>
  </header>
)

const Page = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/random' component={Random}/>
  </Switch>
)

export default App;
