import React, {Component} from 'react';

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

export default Search;