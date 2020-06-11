import React from 'react';
import { Link } from 'react-router-dom';

class NavSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      query: ""
    }
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput() {

  }

  render() {

    return (
      <form>
        <input 
          type="search"
          placeholder="Search Cappers"
          className="nav-search-field"
          value={this.state.query}
          onChange={this.handleInput}
        />
      </form>
    )
  }
}

export default NavSearch;