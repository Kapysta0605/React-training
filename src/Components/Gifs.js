import React, {Component} from 'react';

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

export default Gifs;