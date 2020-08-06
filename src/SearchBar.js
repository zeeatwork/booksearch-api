import React from 'react';

class FilterBar extends React.Component {
  render(){
    return(
      <form id="search-bar">
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" name="search" value={this.props.searchTermProp} onChange={this.props.handleSearch} />
        <button onClick={this.props.handleClickProp} >Search</button>
      </form>
    )
  }
}

export default FilterBar;