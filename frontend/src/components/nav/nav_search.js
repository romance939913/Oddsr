import React from 'react';
import { Link } from 'react-router-dom';

class NavSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      query: ""
    }
  }

  render() {

    return (
      <form>
        <input 
          type="search"
          placeholder="Search Cappers"
          className="nav-search-field"
          value={this.state.query}
        />
      </form>
    )
  }
}

export default NavSearch;