import React, {Component} from 'react';
import axios from 'axios'
import Search from './Search'
import Gifs from './Gifs'

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

export default Home;