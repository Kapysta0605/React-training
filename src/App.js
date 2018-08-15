import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'

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

class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      actions: {
        showTrandings: this.showTrandings,
        search: this.search
      }
    }
    this.showTrandings();
  }
  render() {
    return (
      <div className='home'>
        <Search actions={this.state.actions}/>
        <Gifs gifs={this.state.gifs}/>
      </div>
    );
  }
  showTrandings = () => {
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=bYoPuRhWscsxsdk8mndtN4gWmgij5h3p&limit=28&rating=R')
    .then(res => this.setState({
      gifs: res.data.data.map(gif => gif.images['downsized_medium'].url)
    }));
  }
  search = (data) => {
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=bYoPuRhWscsxsdk8mndtN4gWmgij5h3p&q=${data}&limit=28&offset=0&rating=R&lang=en`)
    .then(res => this.setState({
      gifs: res.data.data.map(gif => gif.images['downsized_medium'].url)
    }));
  }
}

class Gifs extends Component {
  constructor(props) {
    super(props);
    const gifs = props.gifs ? props.gifs : [];
    this.state = {
      gifs
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className='gifs'>
        {this.props.gifs.map((gif, index) => (
          <img src={gif} className='gif' key={index}/>
        ))}
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }
  render() {
    return (
      <div className='search'>
        <input type='text' onClick={this.triggerSearch} ref = 'input'></input>
        <button onClick = {(e) => this.triggerSearch(e)}>
              Add
        </button>
      </div>
    )
  }
  triggerSearch = (e) => {
    const node = this.refs.input;
    const data = node.value.trim();
    data === '' ? this.state.actions.showTrandings() : this.state.actions.search(data);
  }
}

class Random extends Component {
  state = {
    gifs: [],
    actions: [
      this.doRandom
    ]
  }
  constructor(props) {
    super(props);
    this.doRandom();
  }
  render() {
    return (
      <div className='random'>
        <button onClick={this.doRandom}>DO RANDOM</button>
        <Gifs gifs={this.state.gifs}/>
      </div>
    );
  }
  doRandom = () => {
    axios.get(`https://api.giphy.com/v1/gifs/random?api_key=bYoPuRhWscsxsdk8mndtN4gWmgij5h3p&tag=&rating=R`)
    .then(res => this.setState({
      gifs: [res.data.data.images['downsized_medium'].url]
    }));
  }
}


export default App;
