import React, {Component} from 'react';
import axios from 'axios'
import Gifs from './Gifs'

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

export default Random;